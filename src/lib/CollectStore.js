/* global cozy */
import * as accounts from './accounts'
import * as konnectors from './konnectors'
import * as jobs from './jobs'

import {
  createConnection,
  deleteConnection,
  enqueueConnection,
  updateConnectionError,
  updateConnectionRunningStatus
} from '../ducks/connections'

const AUTHORIZED_CATEGORIES = require('config/categories')
const isValidCategory = (cat) => AUTHORIZED_CATEGORIES.includes(cat)

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
  constructor (connectors, folders, context) {
    this.listener = null

    // Store all existing konnectorResults (one per konnector/account)
    // to be able to determine account connection state.
    this.konnectorResults = new Map()
    // Listeners on connection statuses
    this.connectionStatusListeners = new Map()

    // Store all the currently running jobs related to konnectors
    this.unfinishedJob = new Map()

    // Installing/installed konnectors
    this.installedKonnectors = new Map()

    this.connectors = this.sanitizeCategories(connectors.sort(sortByName))
    this.folders = folders
    this.useCases = require(`../contexts/${context}/index`).useCases
    this.categories = require('../config/categories')
    this.driveUrl = null

    this.initializeRealtime()
  }

  // Populate the store
  fetchInitialData (domain) {
    return Promise.all([
      this.fetchAllAccounts(),
      this.fetchInstalledKonnectors(),
      this.fetchKonnectorResults(),
      this.fetchKonnectorUnfinishedJobs(domain)
    ])
  }

  initializeRealtime () {
    jobs.subscribeAll(cozy.client)
      .then(subscription => {
        subscription
          .onCreate(job => this.updateUnfinishedJob(job))
          .onUpdate(job => this.updateUnfinishedJob(job))
          .onDelete(job => this.deleteRunningJob(job))
      })
      .catch(error => {
        console.warn && console.warn(`Cannot initialize realtime for jobs: ${error.message}`)
      })

    konnectors.subscribeAll(cozy.client)
      .then(subscription => {
        subscription
          .onCreate(konnector => this.updateInstalledKonnector(konnector))
          .onUpdate(konnector => this.updateInstalledKonnector(konnector))
      })
      .catch(error => {
        console.warn && console.warn(`Cannot initialize realtime for konnectors: ${error.message}`)
      })

    konnectors.subscribeAllResults(cozy.client)
      .then(subscription => {
        subscription
          .onCreate(result => this.updateKonnectorResult(result))
          .onUpdate(result => this.updateKonnectorResult(result))
      })
      .catch(error => {
        console.warn && console.warn(`Cannot initialize realtime for jobs: ${error.message}`)
      })
  }

  updateInstalledKonnector (konnector) {
    const slug = konnector.slug || konnector.attributes.slug
    this.installedKonnectors.set(slug, konnector)
    this.triggerConnectionStatusUpdate(this.getKonnectorBySlug(slug))
  }

  updateKonnectorResult (konnectorResult) {
    const slug = konnectorResult._id
    const konnector = this.getKonnectorBySlug(slug)
    this.konnectorResults.set(slug, konnectorResult)
    this.triggerConnectionStatusUpdate(konnector)
  }

  updateUnfinishedJob (job) {
    if (job.state === jobs.JOB_STATE.DONE || job.state === jobs.JOB_STATE.ERRORED) {
      return this.deleteRunningJob(job)
    }

    const slug = job.konnector
    const konnector = this.getKonnectorBySlug(slug)
    this.unfinishedJob.set(slug, job)
    this.triggerConnectionStatusUpdate(konnector)
  }

  deleteRunningJob (job) {
    const slug = job.konnector
    const konnector = this.getKonnectorBySlug(slug)
    const deleted = this.unfinishedJob.delete(slug)
    if (deleted) this.triggerConnectionStatusUpdate(konnector)
  }

  sanitizeCategories (connectors) {
    return connectors.map(c => Object.assign({}, c, {
      category: isValidCategory(c.category) ? c.category : 'others'
    }))
  }

  sanitizeKonnector (konnector) {
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
  mergeKonnectors (source, target) {
    return Object.assign({}, target, this.sanitizeKonnector(source))
  }

  triggerConnectionStatusUpdate (konnector) {
    const slug = konnector.slug || konnector.attributes.slug
    const listeners = this.connectionStatusListeners.get(slug)
    if (listeners) {
      listeners.forEach(listener => {
        listener(this.getConnectionStatus(konnector))
      })
    }
  }

  getKonnectorBySlug (slug) {
    return this.connectors.find(connector => connector.slug === slug)
  }

  updateConnector (connector) {
    if (!connector) throw new Error('Missing mandatory connector parameter')
    const slug = connector.slug || connector.attributes.slug
    if (!slug) throw new Error('Missing mandatory slug property in konnector')

    const current = this.connectors.find(connector => connector.slug === slug)
    const updatedConnector = this.mergeKonnectors(connector, current)

    this.connectors = this.connectors.map(connector => {
      return connector === current
        ? updatedConnector
          : connector
    })

    return updatedConnector
  }

  getUseCases () {
    return this.useCases
  }

  find (cb) {
    return this.connectors.find(cb)
  }

  findConnected () {
    return this.connectors.filter(c => c.accounts.length !== 0)
  }

  findByCategory ({filter}) {
    return filter === 'all' ? this.connectors
      : this.connectors.filter(c => c.category === filter)
  }

  findByUseCase (slug) {
    let useCase = this.useCases.find(u => u.slug === slug)
    return useCase.connectors
      .map(c1 => this.find(c2 => c1.slug === c2.slug))
      .filter(item => item !== undefined)
      .sort(sortByName)
  }

  // Get the drive application url using the list of application
  // FIXME this works only because we need the application list permission for the cozy-bar
  // and this also supposes that the drive application has the 'drive' slug
  fetchDriveUrl () {
    return cozy.client.fetchJSON('GET', '/apps/')
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

  fetchInstalledKonnectors () {
    return konnectors
      .findAll(cozy.client)
      .then(konnectors => {
        konnectors.forEach(konnector => {
          this.installedKonnectors.set(konnector.slug, konnector)
        })
      })
  }

  fetchKonnectorResults () {
    return konnectors
      .findAllResults(cozy.client)
      .then(konnectorResults => {
        konnectorResults.forEach((konnectorResult) => {
          this.konnectorResults.set(konnectorResult._id, konnectorResult)
        })
        return konnectorResults
      })
  }

  // Fetch all accounts and updates their matching connectors
  fetchAllAccounts () {
    return accounts
      .getAllAccounts(cozy.client)
      .then(accounts => {
        this.connectors.forEach(konnector => {
          konnector.accounts = accounts.filter(account => account.account_type === konnector.slug)
        })
        return accounts
      })
  }

  fetchKonnectorUnfinishedJobs (domain) {
    return jobs.findQueuedOrRunning(cozy.client)
      .then(jobs => {
        jobs.forEach(job => {
          this.updateUnfinishedJob(job)
        })
        return jobs
      })
  }

  // Account connection workflow, see
  // https://github.com/cozy/cozy-stack/blob/master/docs/konnectors_workflow_example.md
  connectAccount (konnector, account, folderPath, disableEnqueue, enqueueAfter = 7000) {
    const startTime = new Date().getTime()

    // return object to store all business object implied in the connection
    const connection = {}
    // detect oauth case
    const isOAuth = !!account.oauth

    function createDirectoryIfNecessary (folderPath) {
      if (folderPath) {
        return cozy.client.files.createDirectoryByPath(folderPath)
      } else {
        return Promise.resolve(null)
      }
    }

    // 1. Create folder, will be replaced by an intent or something else
    return createDirectoryIfNecessary(folderPath)
      // 2. Create account
      .then(folder => {
        const folderId = folder ? folder._id : null
        connection.folderId = folderId
        if (isOAuth) {
          const newAttributes = {}

          if (folderId) {
            newAttributes.folderId = folderId
          }

          return accounts.update(cozy.client, account, Object.assign({}, account, newAttributes))
        } else {
          return accounts.create(cozy.client, konnector, account.auth, folderId)
        }
      })
      // 3. Konnector installation
      .then(account => {
        this.dispatch(createConnection(konnector, account, connection.folderId))
        this.dispatch(updateConnectionRunningStatus(konnector, account, true))

        connection.account = account

        return new Promise((resolve, reject) => {
          let enqueued = false
          let enqueueTimeout

          const enqueue = () => {
            clearTimeout(enqueueTimeout)
            this.dispatch(enqueueConnection(konnector, account))
            enqueued = true
            resolve(connection)
          }

          konnectors.install(cozy.client, konnector, INSTALL_TIMEOUT)
            // 4. Add account to konnector
            .then(installedkonnector => {
              return konnectors.addAccount(cozy.client, installedkonnector, connection.account)
            })
            // 5. Add permissions to folder for konnector if folder created
            .then(completeKonnector => {
              connection.konnector = completeKonnector
              this.updateConnector(completeKonnector)
              if (!connection.folderID) return Promise.resolve()
              return konnectors.addFolderPermission(cozy.client, completeKonnector, connection.folderID)
            })
            // 6. Reference konnector in folder
            .then(permission => {
              if (!permission) return Promise.resolve()
              connection.permission = permission
              return cozy.client.data.addReferencedFiles(connection.konnector, connection.folderID)
            })
            // 7. Run a job for the konnector
            .then(() => konnectors.run(
              cozy.client,
              connection.konnector,
              connection.account
            ))
            // 8. Creates trigger
            .then(job => {
              connection.job = job

              const state = job.state || job.attributes.state
              connection.successTimeout = ![konnectors.JOB_STATE.ERRORED, konnectors.JOB_STATE.DONE].includes(state)

              const slug = connection.konnector.slug || connection.konnector.attributes.slug

              const workerArguments = {
                konnector: slug,
                account: connection.account._id
              }

              if (connection.folderID) {
                workerArguments['folder_to_save'] = connection.folderID
              }

              return cozy.client.fetchJSON('POST', '/jobs/triggers', {
                data: {
                  attributes: {
                    type: '@cron',
                    arguments: `0 0 0 * * ${(new Date()).getDay()}`,
                    worker: 'konnector',
                    worker_arguments: workerArguments
                  }
                }
              })
            })
            .then(() => {
              const { konnector, account } = connection
              this.dispatch(updateConnectionRunningStatus(konnector, account, false))
              this.updateConnector(konnector)
              enqueue()
            })
            .catch(error => {
              this.dispatch(updateConnectionRunningStatus(connection.konnector || konnector, connection.account || account, false))
              this.dispatch(updateConnectionError(connection.konnector || konnector, connection.account, error))
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
  }

  /**
   * runAccount Runs an account
   * @param {object}  connector            A connector
   * @param {object}  account              the account to run, must belong to the connector
   * @param {Boolean} disableEnqueue Boolean to disable a success timeout in the run method. Used by example by the onboarding
   * @returns The run result or a resulting error
   */
  runAccount (connector, account, disableEnqueue, enqueueAfter = 7000) {
    // TODO: mutualize this part with connectAccount
    this.dispatch(updateConnectionRunningStatus(connector, account, true))

    return new Promise((resolve, reject) => {
      let enqueued = false
      let enqueueTimeout

      const enqueue = () => {
        clearTimeout(enqueueTimeout)
        this.dispatch(enqueueConnection(connector, account))
        enqueued = true
        resolve()
      }

      konnectors
        .run(cozy.client, connector, account, disableEnqueue)
        .then(job => {
          this.dispatch(updateConnectionRunningStatus(connector, account, false))
          if (!enqueued) {
            enqueue()
            resolve(job)
          }
        })
        .catch(error => {
          this.dispatch(updateConnectionRunningStatus(connector, account, false))
          this.dispatch(updateConnectionError(connector, account, error))
          if (!enqueued) {
            clearTimeout(enqueueTimeout)
            reject(error)
          }
        })

      if (!disableEnqueue) {
        enqueueTimeout = setTimeout(enqueue, enqueueAfter)
      }
    })
  }

  fetchAccounts (accountType) {
    return accounts.getAccountsByType(cozy.client, accountType)
  }

  /**
   * updateAccount : updates an account in a connector in DB with new values
   * @param {Object} connector The connector to update
   * @param {Object} account   The account to update
   * @param {Object} values    The new values of the updated account
   * @returns {Object} The up to date connector
   */
  updateAccount (connector, account, values) {
    // Save the previous state
    const previousAccount = Object.assign({}, account)

    // Update account data
    account.auth.login = values.login
    account.auth.password = values.password

    return accounts.update(cozy.client, previousAccount, account)
    .then(updatedAccount => {
      const accountIndex = this.findAccountIndexById(connector.accounts, account._id)
      // Updates the _rev value of the account in the connector
      connector.accounts[accountIndex] = updatedAccount
      this.updateConnector(connector)
      return updatedAccount
    })
    .catch((error) => {
      return Promise.reject(error)
    })
  }

  /**
   * findAccountIndexById : returns the account index in an array of accounts, based on its id.
   * @param {array}    accounts Array of accounts
   * @param {string}   id       Id of the account we look for
   * @return {integer} The position of the account with the looked for id in the array
   */
  findAccountIndexById (accounts, id) {
    let foundIndex = -1
    accounts.forEach((account, index) => {
      if (account._id === id) {
        foundIndex = index
      }
    })
    return foundIndex
  }

  deleteAccounts (konnector) {
    konnector = this.connectors.find(c => c.slug === konnector.slug)
    return Promise.all(konnector.accounts.map(account =>
      accounts._delete(cozy.client, account)
        .then(() => this.dispatch(deleteConnection(konnector, account)))
        .then(() => konnector.accounts.splice(konnector.accounts.indexOf(account), 1))
        .then(() => {
          if (!account.folderId) return
          return konnectors.unlinkFolder(cozy.client, konnector, account.folderId)
        })
      ))
      .then(() => this.updateConnector(konnector))
      .then(konnector => this.triggerConnectionStatusUpdate(konnector))
  }

  manifestToKonnector (manifest) {
    return manifest
  }

  // get properties from installed konnector or remote manifest
  fetchKonnectorInfos (slug) {
    return this.getInstalledConnector(slug)
      .then(konnector => {
        if (!konnector) {
          konnector = this.connectors.find(k => k.slug === slug)
        }

        return konnector ? konnectors.fetchManifest(cozy.client, konnector.repo)
          .then(this.manifestToKonnector)
          .catch(error => {
            console.warn && console.warn(`Cannot fetch konnector's manifest (Error ${error.status})`)
            return konnector
          }) : null
      })
      .then(konnector => konnector ? this.updateConnector(konnector) : null)
  }

  getInstalledConnector (slug) {
    return konnectors.findBySlug(cozy.client, slug)
  }

  createIntentService (intent, window) {
    return cozy.client.intents.createService(intent, window)
  }

  konnectorHasAccount (konnector) {
    const slug = konnector.slug || konnector.attributes.slug
    const legacyKonnector = this.getKonnectorBySlug(slug)
    return legacyKonnector && legacyKonnector.accounts && !!legacyKonnector.accounts.length
  }

  // Selector to get KonnectorStatus
  getConnectionStatus (konnector) {
    const slug = konnector.slug || konnector.attributes.slug

    const installedKonnector = this.installedKonnectors.get(slug)

    if (installedKonnector) {
      if (installedKonnector.error) {
        return CONNECTION_STATUS.ERRORED
      }

      switch (installedKonnector.state) {
        case konnectors.KONNECTOR_STATE.INSTALLED:
        case konnectors.KONNECTOR_STATE.READY:
          // ignore
          break
        default:
          return CONNECTION_STATUS.RUNNING
      }
    }

    const legacyKonnector = this.getKonnectorBySlug(slug)
    const hasAccount = legacyKonnector.accounts && legacyKonnector.accounts.length
    if (!hasAccount) return null

    const runningJob = this.unfinishedJob.get(slug)

    if (runningJob) {
      return CONNECTION_STATUS.RUNNING
    }

    const konnectorResult = this.konnectorResults.get(slug)

    if (!this.konnectorHasAccount(konnector)) {
      return null
    }

    if (konnectorResult) {
      switch (konnectorResult.state) {
        case konnectors.KONNECTOR_RESULT_STATE.ERRORED:
          return CONNECTION_STATUS.ERRORED
        case konnectors.KONNECTOR_RESULT_STATE.CONNECTED:
          return CONNECTION_STATUS.CONNECTED
        default: break
      }
    }

    return null
  }

  isConnectionStatusRunning (konnector) {
    return this.getConnectionStatus(konnector) === CONNECTION_STATUS.RUNNING
  }

  // listen for update on connection (will be useful for realtime)
  addConnectionStatusListener (konnector, listener) {
    const slug = konnector.slug || konnector.attributes.slug
    const listeners = this.connectionStatusListeners.get(slug) || []
    this.connectionStatusListeners.set(slug, listeners.concat([listener]))
  }

  removeConnectionStatusListener (konnector, listener) {
    const slug = konnector.slug || konnector.attributes.slug

    const listeners = this.connectionStatusListeners.get(slug)

    if (listeners && listeners.includes(listener)) {
      this.connectionStatusListeners.set(slug, listeners.filter(l => l._id !== listener._id))
    }
  }

  getConnectionError (konnector) {
    const noAccount = !this.konnectorHasAccount(konnector)
    if (noAccount) return null

    const slug = konnector.slug || konnector.attributes.slug

    const konnectorResult = this.konnectorResults.get(slug)

    if (konnectorResult && konnectorResult.error) {
      return new Error(konnectorResult.error)
    }

    return null
  }
}
