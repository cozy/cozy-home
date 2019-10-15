import { cozyConnect } from 'redux-cozy-client'

import { fetchAccounts } from 'ducks/accounts'
import { fetchKonnectors } from 'ducks/konnectors'
import { fetchKonnectorJobs } from 'ducks/jobs'
import { fetchTriggers } from 'ducks/triggers'

const mapDocumentsToProps = () => ({
  accounts: fetchAccounts(),
  jobs: fetchKonnectorJobs(),
  konnectors: fetchKonnectors(),
  triggers: fetchTriggers()
})

const appEntryPoint = (WrappedComponent, selectData) =>
  cozyConnect(mapDocumentsToProps)(WrappedComponent, selectData)

export default appEntryPoint
