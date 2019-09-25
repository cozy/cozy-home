import fetch from 'node-fetch'
import FormData from 'form-data'
import { URL } from 'url'
import NodeVaultClient from 'cozy-keys-lib/transpiled/NodeVaultClient'
import CozyClient from 'cozy-client'
import logger from 'cozy-logger'

import updateAccountsPassword from 'cozy-harvest-lib/dist/services/updateAccountsPassword'

const log = logger.namespace('updateAccounts')

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

  try {
    await updateAccountsPassword(
      cozyClient,
      vaultClient,
      JSON.parse(process.env.COZY_COUCH_DOC)
    )
  } catch (err) {
    if (err.message === 'DECRYPT_FAILED') {
      log(
        'warning',
        'Login/password decrypt failed. The cipher may not be shared with the Cozy organization'
      )
    } else {
      throw err
    }
  }
}
;(async () => {
  try {
    await main()
  } catch (error) {
    log('critical', error.message)
  }
})()
