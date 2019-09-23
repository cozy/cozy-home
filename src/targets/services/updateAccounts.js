import fetch from 'node-fetch'
import FormData from 'form-data'
import { URL } from 'url'
import log from 'cozy-logger'
import NodeVaultClient from 'cozy-keys-lib/transpiled/NodeVaultClient'
import CozyClient from 'cozy-client'

import updateAccountsPassword from 'cozy-harvest-lib/dist/services/updateAccountsPassword'

global.fetch = fetch
global.Headers = fetch.Headers
global.Response = fetch.Response
global.Request = fetch.Request
global.FormData = FormData
global.URL = URL

const main = async () => {
  const vaultClient = new NodeVaultClient(process.env.COZY_URL)

  const cozyClient = new CozyClient({
    uri: process.env.COZY_URL.trim(),
    token: process.env.COZY_CREDENTIALS.trim()
  })
  await updateAccountsPassword(
    cozyClient,
    vaultClient,
    JSON.parse(process.env.COZY_COUCH_DOC)
  )
}
;(async () => {
  try {
    await main()
  } catch (error) {
    log('critical', error.message)
  }
})()
