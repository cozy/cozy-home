/* global cozy */
import * as accounts from './accounts'
import * as konnectors from './konnectors'
import * as jobs from './jobs'
import { randomDayTime } from './daytime'

import { createKonnectorTrigger } from '../ducks/triggers'
import { launchTriggerAndQueue } from '../ducks/connections'
import { createAccount } from '../ducks/accounts'

const AUTHORIZED_CATEGORIES = require('config/categories')
const isValidCategory = cat => AUTHORIZED_CATEGORIES.includes(cat)

export const CONNECTION_STATUS = {
  ERRORED: 'errored',
  RUNNING: 'running',
  CONNECTED: 'connected'
}

const INSTALL_TIMEOUT = 120 * 1000

const sortByName = (a, b) => {
  const nameA = a.name.toUpperCase()
  const nameB = b.name.toUpperCase()
  if (nameA < nameB) return -1
  if (nameA > nameB) return 1
  return 0 // if equal
}

export default class CollectStore {
  constructor(connectors, folders, context, options = {}) {
    this.listener = null
    this.options = options

    this.connectors = this.sanitizeCategories(connectors.sort(sortByName))

    if (!this.options.debug) {
      this.connectors = this.connectors.filter(
        connector => connector.slug !== 'debug'
      )
    }

    this.folders = folders
    this.categories = require('../config/categories')
    this.driveUrl = null

    this.initializeRealtime()
  }

  // Populate the store
  fetchInitialData(domain, ignoreJobsAfterInSeconds) {
    return Promise.all([this.initializeKonnectors()])
  }

  initializeKonnectors() {
    return cozy.client
      .fetchJSON('GET', '/settings/context')
      .then(context => {
        const ctx = context.attributes
        if (ctx.exclude_konnectors && ctx.exclude_konnectors.length) {
          this.connectors = this.connectors.filter(
            k => !ctx.exclude_konnectors.includes(k.slug)
          )
        }
      })
      .catch(() => {})
  }

  initializeRealtime() {
    jobs
      .subscribeAll(cozy.client)
      .then(subscription => {
        subscription
          .onCreate(job => this.updateUnfinishedJob(job))
          .onUpdate(job => this.updateUnfinishedJob(job))
        // .onDelete(job => this.deleteRunningJob(job))
      })
      .catch(error => {
        console.warn &&
          console.warn(`Cannot initialize realtime for jobs: ${error.message}`)
      })
  }

  updateUnfinishedJob(job) {
    const normalized = {
      ...job,
      ...job.attributes,
      id: job._id,
      _type: 'io.cozy.jobs'
    }

    this.dispatch({
      type: 'RECEIVE_NEW_DOCUMENT',
      response: { data: [normalized] },
      updateCollections: ['jobs']
    })
  }

  sanitizeCategories(connectors) {
    return connectors.map(c =>
      Object.assign({}, c, {
        category: isValidCategory(c.category) ? c.category : 'others'
      })
    )
  }

  sanitizeKonnector(konnector) {
    const sanitized = Object.assign({}, konnector)

    // disallow empty category
    if (sanitized.category === '') {
      delete sanitized.category
    }

    // disallow updating name and slug
    delete sanitized.name
    delete sanitized.slug
    // custom message only from collect json config
    delete sanitized.additionnalSuccessMessage
    // hasDescriptions only from collect json config
    delete sanitized.hasDescriptions
    // fields settings only from collect json config
    delete sanitized.fields

    return sanitized
  }

  // Merge source into target
  mergeKonnectors(source, target) {
    return Object.assign({}, target, this.sanitizeKonnector(source))
  }

  getKonnectorBySlug(slug) {
    return this.connectors.find(connector => connector.slug === slug)
  }

  updateConnector(connector) {
    if (!connector) throw new Error('Missing mandatory connector parameter')
    const slug = connector.slug || connector.attributes.slug
    if (!slug) throw new Error('Missing mandatory slug property in konnector')

    const current = this.connectors.find(connector => connector.slug === slug)
    const updatedConnector = this.mergeKonnectors(connector, current)

    this.connectors = this.connectors.map(connector => {
      return connector === current ? updatedConnector : connector
    })

    return updatedConnector
  }

  find(cb) {
    return this.connectors.find(cb)
  }

  findConnected() {
    return this.connectors.filter(c => c.accounts.length !== 0)
  }

  findByCategory(category) {
    const categoryExists = this.categories.includes(category)
    return !categoryExists || category === 'all'
      ? this.connectors
      : this.connectors.filter(c => c.category === category)
  }

  findByDataType(dataType) {
    return this.connectors.filter(
      c => c.dataType && c.dataType.includes(dataType)
    )
  }

  // Get the drive application url using the list of application
  // FIXME this works only because we need the application list permission for the cozy-bar
  // and this also supposes that the drive application has the 'drive' slug
  fetchDriveUrl() {
    return cozy.client
      .fetchJSON('GET', '/apps/')
      .then(body => {
        const driveapp = body.find(item => item.attributes.slug === 'drive')
        if (driveapp && driveapp.links) {
          this.driveUrl = `${driveapp.links.related}#/files/`
        }
      })
      .catch(err => {
        console.warn(err)
        return false
      })
  }

  // FIXME: should be handled in a cozy-drive inter-app
  fetchFolders() {
    return cozy.client.data
      .findAll('io.cozy.files')
      .then(result => {
        // if path contains '/.', it contains an hidden folder
        const folders = result
          .filter(f => f.type === 'directory' && !f.path.match(/(?:\/\.)/))
          .sort((a, b) => a.path > b.path)
        return folders
      })
      .catch(err => {
        console.warn(err)
        return []
      })
  }

  // Account connection workflow, see
  // https://github.com/cozy/cozy-stack/blob/master/docs/konnectors_workflow_example.md
  connectAccount(konnector, account, disableEnqueue, enqueueAfter = 7000) {
    const startTime = new Date().getTime()

    // return object to store all business object implied in the connection
    const connection = {}
    // detect oauth case
    const isOAuth = !!account.oauth

    function createDirectoryIfNecessary(folderPath) {
      if (folderPath) {
        return cozy.client.files.createDirectoryByPath(folderPath)
      } else {
        return Promise.resolve(null)
      }
    }

    // 1. Create folder, will be replaced by an intent or something else
    return (
      createDirectoryIfNecessary(account.auth.folderPath)
        // 2. Create account
        .then(folder => {
          connection.folder = folder
          const folderId = folder ? folder._id : null
          if (isOAuth) {
            const newAttributes = {}

            if (folderId) {
              newAttributes.folderId = folderId
            }

            return accounts.update(
              cozy.client,
              account,
              Object.assign({}, account, newAttributes)
            )
          } else {
            return this.dispatch(createAccount(account.auth)).then(result => {
              // Temporary hack ot return account
              return result.data[0]
            })
          }
        })
        // 3. Konnector installation
        .then(account => {
          connection.account = account

          return new Promise((resolve, reject) => {
            let enqueued = false
            let enqueueTimeout

            const enqueue = () => {
              clearTimeout(enqueueTimeout)
              enqueued = true
              resolve(connection)
            }

            konnectors
              .install(cozy.client, konnector, INSTALL_TIMEOUT)
              // 4. Add account to konnector
              .then(installedkonnector => {
                return konnectors.addAccount(
                  cozy.client,
                  installedkonnector,
                  connection.account
                )
              })
              // 5. Add permissions to folder for konnector if folder created
              .then(completeKonnector => {
                connection.konnector = completeKonnector
                this.updateConnector(completeKonnector)
                if (!connection.folder) return Promise.resolve()
                return konnectors.addFolderPermission(
                  cozy.client,
                  completeKonnector,
                  connection.folder._id
                )
              })
              // 6. Reference konnector in folder
              .then(permission => {
                if (!permission) return Promise.resolve()
                connection.permission = permission
                return cozy.client.data.addReferencedFiles(
                  connection.konnector,
                  connection.folder._id
                )
              })
              // 7. Create trigger
              .then(() =>
                this.dispatch(
                  createKonnectorTrigger(
                    connection.konnector,
                    connection.account,
                    connection.folder,
                    {
                      frequency: 'weekly',
                      day: new Date().getDay(),
                      ...randomDayTime(
                        konnector.timeInterval ||
                          this.options.defaultTriggerTimeInterval
                      )
                    }
                  )
                )
              )
              .then(result => result.data[0])
              // 8. Run a job for the konnector
              .then(trigger => this.dispatch(launchTriggerAndQueue(trigger)))
              .then(result => result.data[0])
              // 9. Handle job
              .then(job => {
                connection.job = job

                const state = job.state || job.attributes.state
                connection.successTimeout = ![
                  konnectors.JOB_STATE.ERRORED,
                  konnectors.JOB_STATE.DONE
                ].includes(state)
              })
              .then(() => {
                const { konnector } = connection
                this.updateConnector(konnector)
                enqueue()
              })
              .catch(error => {
                connection.error = error
              })
              .then(() => {
                clearTimeout(enqueueTimeout)
                if (!enqueued) {
                  resolve(connection)
                }
              })

            if (!disableEnqueue) {
              const elapsedTime = startTime - new Date().getTime()

              if (elapsedTime >= enqueueAfter) {
                enqueue()
              } else {
                enqueueTimeout = setTimeout(enqueue, enqueueAfter - elapsedTime)
              }
            }
          })
        })
    )
  }

  /**
   * runAccount Runs an account
   * @param {object}  connector            A connector
   * @param {object}  account              the account to run, must belong to the connector
   * @param {Boolean} disableEnqueue Boolean to disable a success timeout in the run method. Used by example by the onboarding
   * @returns The run result or a resulting error
   */
  runAccount(trigger, connector, account, disableEnqueue, enqueueAfter = 7000) {
    // TODO: mutualize this part with connectAccount
    return this.dispatch(launchTriggerAndQueue(trigger))
  }

  fetchAccounts(accountType) {
    return accounts.getAccountsByType(cozy.client, accountType)
  }

  /**
   * updateAccount : updates an account in a connector in DB with new values
   * @param {Object} connector The connector to update
   * @param {Object} account   The account to update
   * @param {Object} values    The new values of the updated account
   * @returns {Object} The up to date connector
   */
  updateAccount(connector, account, values) {
    // Save the previous state
    const previousAccount = Object.assign({}, account)
    const newAccount = Object.assign({}, account)
    // merge values in account
    newAccount.auth = Object.assign(newAccount.auth, values)

    return accounts
      .update(cozy.client, previousAccount, newAccount)
      .catch(error => {
        return Promise.reject(error)
      })
  }

  updateFolderPath(connector, account, folderId, values, t) {
    // Update file
    return cozy.client.files
      .updateAttributesById(folderId, {
        name: values.namePath,
        path: `${values.folderPath}/${values.namePath}`,
        dir_id: values.dir_id
      })
      .then(() => {
        // Update Account
        this.updateAccount(connector, account, values)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  }

  manifestToKonnector(manifest) {
    return manifest
  }

  // get properties from installed konnector or remote manifest
  fetchKonnectorInfos(slug) {
    return this.getInstalledConnector(slug)
      .then(konnector => {
        if (!konnector) {
          konnector = this.connectors.find(k => k.slug === slug)
        }

        return konnector
          ? konnectors
              .fetchManifest(cozy.client, konnector.repo)
              .then(this.manifestToKonnector)
              .catch(error => {
                console.warn &&
                  console.warn(
                    `Cannot fetch konnector's manifest (Error ${error.status})`,
                    error
                  )
                return konnector
              })
          : null
      })
      .then(konnector => (konnector ? this.updateConnector(konnector) : null))
  }

  getInstalledConnector(slug) {
    return konnectors.findBySlug(cozy.client, slug)
  }

  createIntentService(intent, window) {
    return cozy.client.intents.createService(intent, window)
  }
}
