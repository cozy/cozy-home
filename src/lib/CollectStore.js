/* global cozy */
import { createKonnectorTrigger } from 'ducks/triggers'
import { launchTriggerAndQueue } from 'ducks/connections'
import * as accounts from 'lib/accounts'
import * as konnectors from 'lib/konnectors'
import * as jobs from 'lib/jobs'
import * as triggers from 'lib/triggers'
import { randomDayTime } from 'lib/daytime'

export const CONNECTION_STATUS = {
  ERRORED: 'errored',
  RUNNING: 'running',
  CONNECTED: 'connected'
}

const normalize = (dbObject, doctype) => {
  return {
    ...dbObject,
    ...dbObject.attributes,
    id: dbObject._id,
    _type: doctype || dbObject._type
  }
}

export default class CollectStore {
  constructor(context, options = {}) {
    this.listener = null
    this.options = options

    this.categories = require('../config/categories')
    this.banksUrl = null

    this.initializeRealtime()
  }

  async initializeRealtime() {
    jobs
      .subscribeAll(cozy.client)
      .then(subscription => {
        subscription
          .onCreate(job => this.updateUnfinishedJob(job))
          .onUpdate(job => this.updateUnfinishedJob(job))
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.warn(`Cannot initialize realtime for jobs: ${error.message}`)
      })

    // Not really consistent code style but we try to use only async/await now.
    const realtimeAccounts = await accounts.subscribeAll(cozy.client)
    realtimeAccounts.onCreate(account => this.onAccountCreated(account))

    const realtimeTriggers = await triggers.subscribeAll(cozy.client)
    realtimeTriggers.onDelete(trigger => this.deleteTrigger(trigger))

    realtimeTriggers.onCreate(trigger => this.onTriggerCreated(trigger))
    realtimeAccounts.onUpdate(account => this.onAccountUpdated(account))
  }

  async onAccountCreated(account) {
    this.dispatch({
      type: 'RECEIVE_NEW_DOCUMENT',
      response: { data: [normalize(account, 'io.cozy.accounts')] },
      updateCollections: ['accounts']
    })
  }

  async onAccountUpdated(account) {
    this.dispatch({
      type: 'RECEIVE_UPDATED_DOCUMENT',
      response: { data: [normalize(account, 'io.cozy.accounts')] },
      updateCollections: ['accounts']
    })
  }

  async onTriggerCreated(trigger) {
    this.dispatch({
      type: 'RECEIVE_NEW_DOCUMENT',
      response: { data: [normalize(trigger, 'io.cozy.triggers')] },
      updateCollections: ['triggers']
    })
  }

  async onTriggerUpdated(trigger) {
    this.dispatch({
      type: 'RECEIVE_UPDATED_DOCUMENT',
      response: { data: [normalize(trigger, 'io.cozy.triggers')] },
      updateCollections: ['triggers']
    })
  }

  async deleteTrigger(trigger) {
    this.dispatch({
      type: 'RECEIVE_DELETED_DOCUMENT',
      response: { data: [normalize(trigger, 'io.cozy.triggers')] },
      updateCollections: ['triggers']
    })
  }

  async updateUnfinishedJob(job) {
    const normalizedJob = normalize(job, 'io.cozy.jobs')
    // TODO Filter by worker on the WebSocket when it will be available in the
    // stack
    const isKonnectorJob = normalizedJob.worker === 'konnector'
    const isDeletedAccountHookJob = !!normalizedJob.account_deleted
    if (!isKonnectorJob || isDeletedAccountHookJob) {
      return
    }

    this.dispatch({
      type: 'RECEIVE_NEW_DOCUMENT',
      response: { data: [normalizedJob] },
      updateCollections: ['jobs']
    })
    const trigger = await triggers.fetch(cozy.client, normalizedJob.trigger_id)
    this.onTriggerUpdated(trigger)
  }

  // Get the drive and banks application url using the list of application
  fetchUrls() {
    return cozy.client
      .fetchJSON('GET', '/apps/')
      .then(body => {
        body.forEach(item => {
          if (!item.attributes || !item.attributes.slug || !item.links) return
          switch (item.attributes.slug) {
            case 'banks':
              this.banksUrl = `${item.links.related}`
              break
            default:
              break
          }
        })
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.warn(err.message)
        return false
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
  connectAccount(konnector, account) {
    // return object to store all business object implied in the connection
    const connection = { account, konnector }

    // 1. Create folder, will be replaced by an intent or something else
    return (
      this.createDirectoryIfNecessary(!!account.auth && account.auth.folderPath)
        .then(folder => {
          if (!folder) return Promise.resolve()
          connection.folder = folder
          // 2. Reference konnector in folder
          return konnectors
            .addFolderPermission(
              cozy.client,
              connection.konnector,
              connection.folder._id
            )
            .then(permission => {
              connection.permission = permission
              return cozy.client.data.addReferencedFiles(
                connection.konnector,
                connection.folder._id
              )
            })
        })
        // 4. Create trigger
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
                startDate: new Date(),
                ...randomDayTime(
                  konnector.time_interval ||
                    this.options.defaultTriggerTimeInterval
                )
              }
            )
          ).then(result => result.data[0])
        )
        // 5. Launch trigger for the konnector
        .then(trigger =>
          this.dispatch(
            launchTriggerAndQueue(trigger, konnector.loginDelay)
          ).then(result => result.data[0])
        )
        // 6. Handle job
        .then(job => {
          connection.job = job
        })
        .catch(error => {
          connection.error = error
        })
        // 7. Returns connection
        .then(() => connection)
    )
  }

  /**
   * runAccount Runs an account
   * @param {object}  connector            A connector
   * @param {object}  account              the account to run, must belong to the connector
   * @param {Boolean} disableEnqueue Boolean to disable a success timeout in the run method. Used by example by the onboarding
   * @returns The run result or a resulting error
   */
  runAccount(trigger) {
    // TODO: mutualize this part with connectAccount
    return this.dispatch(launchTriggerAndQueue(trigger))
  }

  /**
   * updateAccount : updates an account in a connector in DB with new values
   * @param {Object} account   The account to update
   * @param {Object} values    The new values of the updated account
   * @returns {Object} The up to date connector
   */
  updateAccount(account, values) {
    // Save the previous state
    const previousAccount = Object.assign({}, account)
    const newAccount = Object.assign({}, account)
    // merge values in account
    newAccount.auth = Object.assign({}, newAccount.auth, values)

    return accounts
      .update(cozy.client, previousAccount, newAccount)
      .catch(error => {
        return Promise.reject(error)
      })
  }

  createIntentService(intent, window) {
    return cozy.client.intents.createService(intent, window)
  }
}
