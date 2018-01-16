/* global cozy */
import * as accounts from './accounts'
import * as konnectors from './konnectors'
import * as jobs from './jobs'
import { randomDayTime } from './daytime'

import { createKonnectorTrigger } from '../ducks/triggers'
import { launchTriggerAndQueue } from '../ducks/connections'
import { createAccount } from '../ducks/accounts'

const KONNECTORS_DOCTYPE = 'io.cozy.konnectors'

export const CONNECTION_STATUS = {
  ERRORED: 'errored',
  RUNNING: 'running',
  CONNECTED: 'connected'
}

const INSTALL_TIMEOUT = 120 * 1000

export default class CollectStore {
  constructor(connectors, folders, context, options = {}) {
    this.listener = null
    this.options = options

    this.folders = folders
    this.categories = require('../config/categories')
    this.driveUrl = null

    this.initializeRealtime()
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

    konnectors.subscribeAll(cozy.client).then(subscription => {
      subscription.onCreate(konnector =>
        this.handleInstalledKonnector(konnector)
      )
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

  handleInstalledKonnector(konnector) {
    const normalized = {
      ...konnector,
      ...konnector.attributes,
      id: `${KONNECTORS_DOCTYPE}/${konnector.slug}`,
      _type: KONNECTORS_DOCTYPE
    }

    this.dispatch({
      type: 'RECEIVE_NEW_DOCUMENT',
      response: { data: [normalized] },
      updateCollections: ['konnectors']
    })
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

  createDirectoryIfNecessary(folderPath) {
    if (folderPath) {
      return cozy.client.files.createDirectoryByPath(folderPath)
    } else {
      return Promise.resolve(null)
    }
  }

  // Account connection workflow, see
  // https://github.com/cozy/cozy-stack/blob/master/docs/konnectors_workflow_example.md
  connectAccount(konnector, account, disableEnqueue, enqueueAfter = 7000) {
    const startTime = new Date().getTime()

    // return object to store all business object implied in the connection
    const connection = {}
    // detect oauth case
    const isOAuth = !!account.oauth

    // 1. Create folder, will be replaced by an intent or something else
    return (
      this.createDirectoryIfNecessary(!!account.auth && account.auth.folderPath)
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
                connection.konnector = { ...konnector, ...completeKonnector }
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
                      // We always pass a default day value,
                      // `createKonnectorTrigger` will
                      // then use it if it needs.
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

  createIntentService(intent, window) {
    return cozy.client.intents.createService(intent, window)
  }
}
