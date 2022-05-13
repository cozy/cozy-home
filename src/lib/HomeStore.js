import { isKonnectorJob } from 'ducks/connections'

import CozyRealtime from 'cozy-realtime'
import Intents from 'cozy-interapp'
import { Q } from 'cozy-client'

 const RECEIVE_CREATED_KONNECTOR = 'RECEIVE_CREATED_KONNECTOR'
 const RECEIVE_UPDATED_KONNECTOR = 'RECEIVE_UPDATED_KONNECTOR'
 const RECEIVE_DELETED_KONNECTOR = 'RECEIVE_DELETED_KONNECTOR'
export const ACCOUNTS_DOCTYPE = 'io.cozy.accounts'
export const JOBS_DOCTYPE = 'io.cozy.jobs'
export const TRIGGERS_DOCTYPE = 'io.cozy.triggers'
export const KONS_DOCTYPE = 'io.cozy.konnectors'

const normalize = (dbObject, doctype) => {
  return {
    ...dbObject,
    ...dbObject.attributes,
    id: dbObject._id,
    _type: doctype || dbObject._type
  }
}

export default class HomeStore {
  constructor(context, client, options = {}) {
    this.client = client
    this.intents = new Intents({ client })
    this.listener = null
    this.options = options

    this.categories = require('../config/categories')

    this.updateUnfinishedJob = this.updateUnfinishedJob.bind(this)
    this.onAccountCreated = this.onAccountCreated.bind(this)
    this.onAccountUpdated = this.onAccountUpdated.bind(this)
    this.onAccountDeleted = this.onAccountDeleted.bind(this)
    this.onTriggerCreated = this.onTriggerCreated.bind(this)
    this.onTriggerUpdated = this.onTriggerUpdated.bind(this)
    this.onTriggerDeleted = this.onTriggerDeleted.bind(this)
    this.onKonnectorCreated = this.onKonnectorCreated.bind(this)
    this.onKonnectorUpdated = this.onKonnectorUpdated.bind(this)
    this.onKonnectorDeleted = this.onKonnectorDeleted.bind(this)

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
    this.realtime.subscribe('updated', TRIGGERS_DOCTYPE, this.onTriggerUpdated)
    this.realtime.subscribe('deleted', TRIGGERS_DOCTYPE, this.onTriggerDeleted)

    this.realtime.subscribe('created', KONS_DOCTYPE, this.onKonnectorCreated)
    this.realtime.subscribe('updated', KONS_DOCTYPE, this.onKonnectorUpdated)
    this.realtime.subscribe('deleted', KONS_DOCTYPE, this.onKonnectorDeleted)
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

  async onKonnectorCreated(konnector) {
    this.dispatch({
      type: RECEIVE_CREATED_KONNECTOR,
      response: { data: [normalize(konnector, KONS_DOCTYPE)] },
      updateCollections: ['konnectors']
    })
  }

  async onKonnectorUpdated(konnector) {
    this.dispatch({
      type: RECEIVE_UPDATED_KONNECTOR,
      response: { data: [normalize(konnector, KONS_DOCTYPE)] },
      updateCollections: ['konnectors']
    })
  }

  async onKonnectorDeleted(konnector) {
    this.dispatch({
      type: RECEIVE_DELETED_KONNECTOR,
      response: { data: [normalize(konnector, KONS_DOCTYPE)] },
      updateCollections: ['konnectors']
    })
  }

  async updateUnfinishedJob(job) {
    const normalizedJob = normalize(job, JOBS_DOCTYPE)
    // TODO Filter by worker on the WebSocket when it will be available in the
    // stack
    const isDeletedAccountHookJob = !!normalizedJob.account_deleted
    const isKonnectorJobWithoutTrigger = !normalizedJob.trigger_id
    if (
      !isKonnectorJob ||
      isDeletedAccountHookJob ||
      isKonnectorJobWithoutTrigger
    ) {
      return
    }

    this.dispatch({
      type: 'RECEIVE_NEW_DOCUMENT',
      response: { data: [normalizedJob] },
      updateCollections: ['jobs']
    })
    const trigger = await this.client.query(Q('io.cozy.triggers').getById(normalizedJob.trigger_id))
    this.onTriggerUpdated(trigger)
  }

  createIntentService(intent, window) {
    return this.intents.createService(intent, window)
  }

  // Get the drive and banks application url using the list of application
  fetchUrls() {
    return (
      this.client.query(Q('io.cozy.apps'))
        // eslint-disable-next-line promise/always-return
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
    )
  }
}
