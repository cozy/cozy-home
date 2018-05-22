import { cozyConnect } from 'redux-cozy-client'

import { initializeRegistry } from '../ducks/registry'
import { fetchAccounts } from '../ducks/accounts'
import { fetchKonnectorJobs } from '../ducks/jobs'
import { fetchKonnectors } from '../ducks/konnectors'
import { fetchTriggers } from '../ducks/triggers'

const mapActionsToProps = dispatch => ({
  initializeRegistry: konnectors => dispatch(initializeRegistry(konnectors))
})

const mapDocumentsToProps = () => ({
  accounts: fetchAccounts(),
  jobs: fetchKonnectorJobs(),
  konnectors: fetchKonnectors(),
  triggers: fetchTriggers()
  // TODO: fetch registry
  // registry: fetchRegistry()
})

const appEntryPoint = (WrappedComponent, selectData) =>
  cozyConnect(mapDocumentsToProps, mapActionsToProps)(
    WrappedComponent,
    selectData
  )

export default appEntryPoint
