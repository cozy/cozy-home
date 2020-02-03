import fetch from 'node-fetch'
import FormData from 'form-data'
import { URL } from 'url'
import CozyClient from 'cozy-client'
import logger from 'cozy-logger'

import deleteAccounts from 'cozy-harvest-lib/dist/services/deleteAccounts'

const log = logger.namespace('deleteAccounts')

if (global) {
  global.fetch = global.fetch || fetch
  global.Headers = global.Headers || fetch.Headers
  global.Response = global.Response || fetch.Response
  global.Request = global.Request || fetch.Request
  global.FormData = global.FormData || FormData
  global.URL = global.URL || URL
}

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
