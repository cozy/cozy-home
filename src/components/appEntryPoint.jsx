import CozyClient, { Q, queryConnect } from 'cozy-client'

const ACCOUNT_DOCTYPE = 'io.cozy.accounts'
const KONNECTOR_DOCTYPE = 'io.cozy.konnectors'
const TRIGGER_DOCTYPE = 'io.cozy.triggers'

const OLDER_THAN_THIRTY_SECONDS = CozyClient.fetchPolicies.olderThan(30 * 1000)

const appEntryPoint = queryConnect({
  accounts: {
    query: () => Q(ACCOUNT_DOCTYPE),
    as: 'accounts',
    fetchPolicy: OLDER_THAN_THIRTY_SECONDS
  },
  konnectors: {
    query: () => Q(KONNECTOR_DOCTYPE),
    as: 'konnectors',
    fetchPolicy: OLDER_THAN_THIRTY_SECONDS
  },
  triggers: {
    query: () => Q(TRIGGER_DOCTYPE),
    as: 'triggers',
    fetchPolicy: OLDER_THAN_THIRTY_SECONDS
  }
})

export default appEntryPoint
