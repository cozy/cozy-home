/*
 * This service updates identity, bills and accounts with proper sourceAccountIdentifier in
 * cozyMetadata.sourceAccountIdentifier when possible
 *
 */
import CozyClient from 'cozy-client'
import logger from 'cozy-logger'
import polyfillFetch from './polyfillFetch'
import {
  normalizeIdentities,
  normalizeBills,
  normalizeAccounts
} from './sourceAccountIdentifierNormalizerHelper'

const log = logger.namespace('sourceAccountIdentifierNormalizer')

polyfillFetch()

const main = async () => {
  const client = CozyClient.fromEnv()

  await Promise.all([
    normalizeIdentities(client),
    normalizeBills(client),
    normalizeAccounts(client)
  ])
}
;(async () => {
  try {
    await main()
  } catch (error) {
    log('critical', error.message)
    process.exit(1)
  }
})()
