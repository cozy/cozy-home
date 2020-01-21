/* global cozy */
import * as triggers from 'lib/triggers'

import CozyRealtime from 'cozy-realtime'

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
  constructor(client, options = {}) {
    this.client = client
    this.listener = null
    this.options = options

    this.categories = require('../config/categories')

    this.updateUnfinishedJob = this.updateUnfinishedJob.bind(this)
    this.onAccountCreated = this.onAccountCreated.bind(this)
    this.onAccountUpdated = this.onAccountUpdated.bind(this)
    this.onAccountDeleted = this.onAccountDeleted.bind(this)
    this.onTriggerCreated = this.onTriggerCreated.bind(this)
    this.onTriggerDeleted = this.onTriggerDeleted.bind(this)

    this.initializeRealtime()
  }

  initializeRealtime() {
    this.realtime = new CozyRealtime({ client: this.client })

    this.realtime.subscribe('created', JOBS_DOCTYPE, this.updateUnfinishedJob)
    this.realtime.subscribe('updated', JOBS_DOCTYPE, this.updateUnfinishedJob)

    this.realtime.subscribe('created', ACCOUNTS_DOCTYPE, this.onAccountCreated)
    this.realtime.subscribe('updated', ACCOUNTS_DOCTYPE, this.onAccountUpdated)
    this.realtime.subscribe('deleted', ACCOUNTS_DOCTYPE, this.onAccountDeleted)

    this.realtime.subscribe('created', TRIGGERS_DOCTYPE, this.onTriggerCreated)
    this.realtime.subscribe('deleted', TRIGGERS_DOCTYPE, this.onTriggerDeleted)
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

  async onTriggerDeleted(trigger) {
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

  createIntentService(intent, window) {
    return cozy.client.intents.createService(intent, window)
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
}
