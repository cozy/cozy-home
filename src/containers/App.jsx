/* global cozy */
import React, { Component } from 'react'
import PropTypes from 'react-proptypes'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'

import { enableFlags } from 'cozy-flags'
import Alerter from 'cozy-ui/react/Alerter'
import { Sprite as IconSprite } from 'cozy-ui/react/Icon'
import { Layout, Main, Content } from 'cozy-ui/react/Layout'

import appEntryPoint from 'components/appEntryPoint'
import Failure from 'components/Failure'
import Home from 'components/Home'
import IntentRedirect from 'components/IntentRedirect'
import Loading from 'components/Loading'
import StoreRedirection from 'components/StoreRedirection'
import ConnectionsQueue from 'ducks/connections/components/queue/index'

const IDLE = 'idle'
const FETCHING_CONTEXT = 'FETCHING_CONTEXT'

class App extends Component {
  state = {
    context: {},
    error: null,
    status: IDLE
  }

  constructor(props, context) {
    super(props, context)
    this.store = this.context.store
    this.fetchContext()
  }

  getChildContext() {
    const { context } = this.state
    return context && context.attributes
  }

  async fetchContext() {
    this.setState({
      status: FETCHING_CONTEXT
    })

    const context = await cozy.client
      .fetchJSON('GET', '/settings/context')
      .catch(error => {
        this.setState({
          error,
          status: IDLE
        })
      })

    if (context && context.attributes && context.attributes.features) {
      enableFlags(context.attributes.features)
    }

    this.setState({
      context,
      status: IDLE
    })
  }

  render() {
    const { accounts, konnectors, triggers } = this.props
    const isFetching = [accounts, konnectors, triggers].find(collection =>
      ['pending', 'loading'].includes(collection.fetchStatus)
    )

    const hasError = [accounts, konnectors, triggers].find(
      collection => collection.fetchStatus === 'failed'
    )

    const { status } = this.state
    const isFetchingContext = status === FETCHING_CONTEXT

    const isReady = !hasError && !isFetching && !isFetchingContext

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
        <Alerter />
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
              render={() => (
                <Home base="/connected" wrapper={this.contentWrapper} />
              )}
            />
            <Route exact path="/providers" component={StoreRedirection} />
            <Route path="/providers/:category" component={StoreRedirection} />
            <Redirect exact from="/" to="/connected" />
            <Redirect from="*" to="/connected" />
          </Switch>
        )}
        <ConnectionsQueue />
        <IconSprite />
      </Layout>
    )
  }
}

App.childContextTypes = {
  features: PropTypes.array
}

/*
withRouter is necessary here to deal with redux
https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
*/
export default withRouter(appEntryPoint(App))
