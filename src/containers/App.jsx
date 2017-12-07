import React, { Component } from 'react'
import { cozyConnect } from 'redux-cozy-client'

import Sidebar from '../components/Sidebar'
import Notifier from '../components/Notifier'

import Loading from '../components/Loading'
import Failure from '../components/Failure'
import ConnectionsQueue from '../ducks/connections/components/queue/index'

import { initializeRegistry } from '../ducks/registry'
import { fetchAccounts } from '../ducks/accounts'
import { fetchKonnectorJobs } from '../ducks/jobs'
import { fetchKonnectors } from '../ducks/konnectors'
import { fetchTriggers } from '../ducks/triggers'

class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.store = this.context.store

    props.initializeRegistry(props.initKonnectors)
  }

  render() {
    const { children, accounts, konnectors, triggers } = this.props
    const isFetching = [accounts, konnectors, triggers].find(collection =>
      ['pending', 'loading'].includes(collection.fetchStatus)
    )

    const hasError = [accounts, konnectors, triggers].find(
      collection => collection.fetchStatus === 'failed'
    )

    if (hasError) {
      return (
        <div className="col-initial-error">
          <Failure errorType="initial" />
        </div>
      )
    }
    return isFetching ? (
      <div className="col-initial-loading">
        <Loading loadingType="initial" />
      </div>
    ) : (
      <div className="col-wrapper coz-sticky">
        <Sidebar categories={this.store.categories} />
        <main className="col-content">
          <div role="contentinfo">{children}</div>
        </main>
        <Notifier />
        <ConnectionsQueue />
      </div>
    )
  }
}

const mapActionsToProps = dispatch => ({
  initializeRegistry: konnectors => dispatch(initializeRegistry(konnectors))
})

const mapDocumentsToProps = (state, ownProps) => ({
  accounts: fetchAccounts(),
  jobs: fetchKonnectorJobs(),
  konnectors: fetchKonnectors(),
  triggers: fetchTriggers()
  // TODO: fetch registry
  // registry: fetchRegistry()
})

export default cozyConnect(mapDocumentsToProps, mapActionsToProps)(App)
