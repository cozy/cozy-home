import Intents from 'cozy-interapp'
export const ACCOUNTS_DOCTYPE = 'io.cozy.accounts'
export const JOBS_DOCTYPE = 'io.cozy.jobs'
export const TRIGGERS_DOCTYPE = 'io.cozy.triggers'
export const KONS_DOCTYPE = 'io.cozy.konnectors'

export default class HomeStore {
  constructor(context, client, options = {}) {
    this.client = client
    this.listener = null
    this.options = options
    this.intents = new Intents({ client })
    this.categories = require('../config/categories')
  }

  createIntentService(intent, window) {
    return this.intents.createService(intent, window)
  }
}
