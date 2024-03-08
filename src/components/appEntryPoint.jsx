import CozyClient, { Q, queryConnect } from 'cozy-client'
import '../flags'

const ACCOUNT_DOCTYPE = 'io.cozy.accounts'
const KONNECTOR_DOCTYPE = 'io.cozy.konnectors'
const TRIGGER_DOCTYPE = 'io.cozy.triggers'

const OLDER_THAN_THIRTY_SECONDS = CozyClient.fetchPolicies.olderThan(30 * 1000)

const appEntryPoint = queryConnect({
  accounts: {
    query: () => Q(ACCOUNT_DOCTYPE),
    as: 'io.cozy.accounts',
    fetchPolicy: OLDER_THAN_THIRTY_SECONDS
  },
  konnectors: {
    query: () => Q(KONNECTOR_DOCTYPE),
    as: 'io.cozy.konnectors',
    fetchPolicy: OLDER_THAN_THIRTY_SECONDS
  },
  triggers: {
    query: () =>
      Q(TRIGGER_DOCTYPE).where({ worker: { $in: ['client', 'konnector'] } }),
    as: 'io.cozy.triggers/by_worker_client_konnector',
    fetchPolicy: OLDER_THAN_THIRTY_SECONDS
  }
})

export default appEntryPoint
