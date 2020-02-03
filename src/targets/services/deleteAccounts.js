import CozyClient from 'cozy-client'
import logger from 'cozy-logger'
import polyfillFetch from './polyfillFetch'

import deleteAccounts from 'cozy-harvest-lib/dist/services/deleteAccounts'

const log = logger.namespace('deleteAccounts')

polyfillFetch()

const main = async () => {
  const cozyClient = CozyClient.fromEnv()

  await deleteAccounts(cozyClient, JSON.parse(process.env.COZY_COUCH_DOC))
}
;(async () => {
  try {
    await main()
  } catch (error) {
    log('critical', error.message)
  }
})()
