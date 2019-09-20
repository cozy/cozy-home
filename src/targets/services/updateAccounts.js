import fetch from 'node-fetch'
import FormData from 'form-data'
import log from 'cozy-logger'
import NodeVaultClient from 'cozy-keys-lib/transpiled/NodeVaultClient'
import CozyClient from 'cozy-client'

import updateAccountsPassword from 'cozy-harvest-lib/dist/services/updateAccountsPassword'

const COZY_URL = 'http://cozy.tools:8080'
const COZY_CREDENTIALS =
  'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjbGkiLCJpYXQiOjE1Njg5NzM1MTQsImlzcyI6ImNvenkudG9vbHM6ODA4MCIsInNjb3BlIjoiaW8uY296eS5hY2NvdW50cyBjb20uYml0d2FyZGVuLm9yZ2FuaXphdGlvbnMifQ.0wU6SOw5zP34f2dyYh1Qbil44xDSFMWlRkqEXzue0FUrCSpDDM5tcp7BUR_qne2Mic3JvuuWt-yhchh-Afyy_Q'
const COZY_COUCH_DOC = {
  _id: '7679436e56f414b89f1d0b606e01b320',
  login: {
    username:
      '2.mFppKM8dz9ltRQsuBao8Tw==|WAnm9RLw33K3SPBm2eYy3A==|gfqwSpAhisq9Z78/C4TdAMb0IcyNnoWhsRnbxQHpWdg=',
    password:
      '2.wxSBZ6nCUaLR8o8ulfMNZw==|eaG5tOWFfpt8ETvWHkTOIA==|NYunAcdZ4hoOMDw+gZvtjTRmSvfuEX88GTr7dDEn2Bo='
  }
}

global.fetch = fetch
global.Headers = fetch.Headers
global.Response = fetch.Response
global.Request = fetch.Request
global.FormData = FormData

const main = async () => {
  const vaultClient = new NodeVaultClient(COZY_URL)

  const cozyClient = new CozyClient({
    uri: COZY_URL.trim(),
    token: COZY_CREDENTIALS.trim()
  })
  await updateAccountsPassword(cozyClient, vaultClient, COZY_COUCH_DOC)
}
;(async () => {
  try {
    await main()
  } catch (error) {
    log('critical', error.message)
  }
})()
