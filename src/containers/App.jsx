import React, { Component } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import isObjectLike from 'lodash/isObjectLike'
import isArray from 'lodash/isArray'
import keys from 'lodash/keys'
import flatten from 'lodash/flatten'

import flag, { enable as enableFlags } from 'cozy-flags'
import minilog from 'minilog'

import Alerter from 'cozy-ui/react/Alerter'
import { Sprite as IconSprite } from 'cozy-ui/react/Icon'
import { Main } from 'cozy-ui/react/Layout'
import Spinner from 'cozy-ui/react/Spinner'

import appEntryPoint from 'components/appEntryPoint'
import HeroHeader from 'components/HeroHeader'
import Failure from 'components/Failure'
import Home from 'components/Home'
import IntentRedirect from 'components/IntentRedirect'
import StoreRedirection from 'components/StoreRedirection'
import ConnectionsQueue from 'ducks/connections/components/queue/index'
import DemoTimeline from 'assets/images/timeline.png'
import { withClient } from 'cozy-client'

const IDLE = 'idle'
const FETCHING_CONTEXT = 'FETCHING_CONTEXT'

window.flag = window.flag || flag
window.minilog = minilog

// TODO add this to cozy-flags ?
export const toFlagNames = (flagName, prefix = '') => {
  if (typeof flagName === 'string') return `${prefix}${flagName}`
  else if (isArray(flagName))
    return flatten(flagName.map(flagName => toFlagNames(flagName, prefix)))
  else if (isObjectLike(flagName))
    return flatten(
      keys(flagName).map(key => toFlagNames(flagName[key], `${prefix}${key}.`))
    )
}

const fetchFeatureFlags = async client => {
  const context = await client.stackClient.fetchJSON('GET', '/settings/context')

  if (context && context.attributes && context.attributes.features) {
    return toFlagNames(context.attributes.features)
  } else {
    return null
  }
}

class App extends Component {
  state = {
    error: null,
    status: IDLE
  }

  componentDidMount() {
    this.fetchContext()
  }

  async fetchContext() {
    try {
      this.setState({
        status: FETCHING_CONTEXT
      })
      const flags = await fetchFeatureFlags(this.props.client)
      if (flags) {
        enableFlags(flags)
      }
    } catch (error) {
      this.setState({ error })
    } finally {
      this.setState({
        status: IDLE
      })
    }
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
    const showTimeline = flag('home_show_timeline') // used in demo envs

    return (
      <div className="App">
        <div
          className="App-MainCol"
          ref={
            isReady
              ? div => {
                  this.contentWrapper = div
                }
              : null
          }
        >
          <Alerter />
          <HeroHeader />
          {hasError && (
            <Main className="main-loader">
              <Failure errorType="initial" />
            </Main>
          )}
          {isFetching && (
            <Main className="main-loader">
              <Spinner size="xxlarge" />
            </Main>
          )}
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
        </div>
        {showTimeline && (
          <div className="Timeline">
            <img src={DemoTimeline} width="420px" />
          </div>
        )}
      </div>
    )
  }
}

/*
withRouter is necessary here to deal with redux
https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
*/
export default withClient(withRouter(appEntryPoint(App)))
