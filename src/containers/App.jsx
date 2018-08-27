import React, { Component } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'

import appEntryPoint from '../components/appEntryPoint'

import Notifier from '../components/Notifier'

import Loading from '../components/Loading'
import Failure from '../components/Failure'
import ConnectionsQueue from '../ducks/connections/components/queue/index'

import Home from '../components/Home'
import IntentRedirect from '../components/IntentRedirect'
import StoreRedirection from '../components/StoreRedirection'

import { Layout, Main, Content } from 'cozy-ui/react/Layout'

class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.store = this.context.store
  }

  render() {
    const { accounts, konnectors, triggers } = this.props
    const isFetching = [accounts, konnectors, triggers].find(collection =>
      ['pending', 'loading'].includes(collection.fetchStatus)
    )

    const hasError = [accounts, konnectors, triggers].find(
      collection => collection.fetchStatus === 'failed'
    )

    const isReady = !hasError && !isFetching

    return (
      <Layout
        monoColumn
        ref={
          isReady &&
          (div => {
            this.contentWrapper = div
          })
        }
      >
        <div className="ho-background" />
        {hasError ||
          (isFetching && (
            <Main>
              <Content
                className={
                  hasError ? 'col-initial-error' : 'col-initial-loading'
                }
              >
                {hasError && <Failure errorType="initial" />}
                {isFetching && <Loading loadingType="initial" />}
              </Content>
            </Main>
          ))}
        {isReady && (
          <Switch>
            <Route path="/redirect" component={IntentRedirect} />
            <Route
              path="/connected"
              render={props => (
                <Home base="/connected" wrapper={this.contentWrapper} />
              )}
            />
            <Route exact path="/providers" component={StoreRedirection} />
            <Route path="/providers/:category" component={StoreRedirection} />
            <Redirect exact from="/" to="/connected" />
            <Redirect from="*" to="/connected" />
          </Switch>
        )}
        <Notifier />
        <ConnectionsQueue />
      </Layout>
    )
  }
}

/*
withRouter is necessary here to deal with redux
https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
*/
export default withRouter(appEntryPoint(App))
