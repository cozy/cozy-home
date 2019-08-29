/* global cozy */
import * as accounts from 'lib/accounts'
import * as jobs from 'lib/jobs'
import * as triggers from 'lib/triggers'

export const CONNECTION_STATUS = {
  ERRORED: 'errored',
  RUNNING: 'running',
  CONNECTED: 'connected'
}

const ACCOUNTS_DOCTYPE = 'io.cozy.accounts'
const JOBS_DOCTYPE = 'io.cozy.jobs'
const TRIGGERS_DOCTYPE = 'io.cozy.triggers'

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
    realtimeAccounts.onUpdate(account => this.onAccountUpdated(account))
    realtimeAccounts.onDelete(trigger => this.onAccountDeleted(trigger))

    const realtimeTriggers = await triggers.subscribeAll(cozy.client)
    realtimeTriggers.onCreate(trigger => this.onTriggerCreated(trigger))
    realtimeTriggers.onDelete(trigger => this.deleteTrigger(trigger))
  }

  async onAccountCreated(account) {
    this.dispatch({
      type: 'RECEIVE_NEW_DOCUMENT',
      response: { data: [normalize(account, ACCOUNTS_DOCTYPE)] },
      updateCollections: ['accounts']
    })
  }

  async onAccountUpdated(account) {
    this.dispatch({
      type: 'RECEIVE_UPDATED_DOCUMENT',
      response: { data: [normalize(account, ACCOUNTS_DOCTYPE)] },
      updateCollections: ['accounts']
    })
  }

  async onAccountDeleted(account) {
    this.dispatch({
      type: 'RECEIVE_DELETED_DOCUMENT',
      response: { data: [normalize(account, ACCOUNTS_DOCTYPE)] },
      updateCollections: ['accounts']
    })
  }

  async onTriggerCreated(trigger) {
    this.dispatch({
      type: 'RECEIVE_NEW_DOCUMENT',
      response: { data: [normalize(trigger, TRIGGERS_DOCTYPE)] },
      updateCollections: ['triggers']
    })
  }

  async onTriggerUpdated(trigger) {
    this.dispatch({
      type: 'RECEIVE_UPDATED_DOCUMENT',
      response: { data: [normalize(trigger, TRIGGERS_DOCTYPE)] },
      updateCollections: ['triggers']
    })
  }

  async deleteTrigger(trigger) {
    this.dispatch({
      type: 'RECEIVE_DELETED_DOCUMENT',
      response: { data: [normalize(trigger, TRIGGERS_DOCTYPE)] },
      updateCollections: ['triggers']
    })
  }

  async updateUnfinishedJob(job) {
    const normalizedJob = normalize(job, JOBS_DOCTYPE)
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

  createIntentService(intent, window) {
    return cozy.client.intents.createService(intent, window)
  }
}
