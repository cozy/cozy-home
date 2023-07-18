import { cozyConnect } from 'lib/redux-cozy-client'

import { fetchAccounts } from 'ducks/accounts'
import { fetchKonnectors } from 'ducks/konnectors'
import { fetchKonnectorJobs } from 'ducks/jobs'
import '../flags'

const mapDocumentsToProps = () => ({
  accounts: fetchAccounts(),
  jobs: fetchKonnectorJobs(),
  konnectors: fetchKonnectors()
})

const appEntryPoint = (WrappedComponent, selectData) =>
  cozyConnect(mapDocumentsToProps)(WrappedComponent, selectData)

export default appEntryPoint
