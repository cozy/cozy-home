import React, { Component } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'

import appEntryPoint from '../components/appEntryPoint'

import Notifier from '../components/Notifier'

import Loading from '../components/Loading'
import Failure from '../components/Failure'
import ConnectionsQueue from '../ducks/connections/components/queue/index'

import ConnectedList from '../components/ConnectedList'

class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.store = this.context.store

    // TODO: externalize into appEntryPoint
    props.initializeRegistry(props.initKonnectors)
  }

  render() {
    const { accounts, konnectors, triggers } = this.props
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
        <main className="col-content">
          <div
            role="contentinfo"
            ref={div => {
              this.contentWrapper = div
            }}
          >
            <Switch>
              <Route
                path="/connected"
                render={props => (
                  <ConnectedList
                    connectedKonnectors={props.connectedKonnectors}
                    wrapper={this.contentWrapper}
                  />
                )}
              />
              <Redirect exact from="/providers" to="/providers/all" />
              <Redirect exact from="/" to="/connected" />
              <Redirect from="*" to="/connected" />
            </Switch>
          </div>
        </main>
        <Notifier />
        <ConnectionsQueue />
      </div>
    )
  }
}

/*
withRouter is necessary here to deal with redux
https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
*/
export default withRouter(appEntryPoint(App))
