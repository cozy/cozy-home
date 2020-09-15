import NodeVaultClient from 'cozy-keys-lib/transpiled/NodeVaultClient'
import CozyClient from 'cozy-client'
import logger from 'cozy-logger'
import polyfillFetch from './polyfillFetch'

import softDeleteOrRestoreAccounts from 'cozy-harvest-lib/dist/services/softDeleteOrRestoreAccounts'

const log = logger.namespace('softDeleteOrRestoreAccounts')

polyfillFetch()

const main = async () => {
  const vaultClient = new NodeVaultClient(process.env.COZY_URL)

  const cozyClient = CozyClient.fromEnv()

  try {
    await softDeleteOrRestoreAccounts(
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
    process.exit(1)
  }
})()
