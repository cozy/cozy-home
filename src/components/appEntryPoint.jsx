import { cozyConnect } from 'redux-cozy-client'

import { fetchAccounts } from '../ducks/accounts'
import { fetchKonnectorJobs } from '../ducks/jobs'
import { fetchKonnectors } from '../ducks/konnectors'
import { fetchTriggers } from '../ducks/triggers'

const mapDocumentsToProps = (state, ownProps) => ({
  accounts: fetchAccounts(),
  jobs: fetchKonnectorJobs(),
  konnectors: fetchKonnectors(),
  triggers: fetchTriggers()
  // TODO: fetch registry
  // registry: fetchRegistry()
})

const appEntryPoint = (WrappedComponent, selectData) =>
  cozyConnect(mapDocumentsToProps)(WrappedComponent, selectData)

export default appEntryPoint
