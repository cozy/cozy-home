import React, { Component } from 'react'
import PropTypes from 'react-proptypes'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import isObjectLike from 'lodash/isObjectLike'
import isArray from 'lodash/isArray'
import keys from 'lodash/keys'
import flatten from 'lodash/flatten'

import { withClient } from 'cozy-client'
import flag, { enable as enableFlags } from 'cozy-flags'
import minilog from '@cozy/minilog'

import Alerter from 'cozy-ui/transpiled/react/Alerter'
import IconSprite from 'cozy-ui/transpiled/react/Icon/Sprite'
import { Main } from 'cozy-ui/transpiled/react/Layout'
import Spinner from 'cozy-ui/transpiled/react/Spinner'

import appEntryPoint from 'components/appEntryPoint'
import MoveModal from 'components/MoveModal'
import HeroHeader from 'components/HeroHeader'
import Failure from 'components/Failure'
import Home from 'components/Home'
import IntentRedirect from 'components/IntentRedirect'
import StoreRedirection from 'components/StoreRedirection'
import DemoTimeline from 'assets/images/timeline.png'
import withCustomWallpaper from 'hoc/withCustomWallpaper'

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

class App extends Component {
  state = {
    error: null,
    status: IDLE
  }

  constructor(props, context) {
    super(props, context)
    this.store = context.store
  }

  componentDidMount() {
    this.fetchContext()
  }

  async fetchContext() {
    this.setState({
      status: FETCHING_CONTEXT
    })
    const { client } = this.props
    const context = await client.stackClient
      .fetchJSON('GET', '/settings/context')
      .catch(error => {
        this.setState({
          error,
          status: IDLE
        })
      })

    if (context && context.attributes && context.attributes.features) {
      const flags = toFlagNames(context.attributes.features)
      enableFlags(flags)
    }

    this.setState({
      status: IDLE
    })
  }

  render() {
    const {
      client,
      accounts,
      konnectors,
      triggers,
      wallpaperFetchStatus,
      wallpaperLink
    } = this.props
    const isFetching = [accounts, konnectors, triggers].find(collection =>
      ['pending', 'loading'].includes(collection.fetchStatus)
    )

    const { cozyDefaultWallpaper } = client.getInstanceOptions()
    let backgroundURL = null
    if (wallpaperFetchStatus !== 'loading') {
      backgroundURL = wallpaperLink || cozyDefaultWallpaper
    }

    const hasError = [accounts, konnectors, triggers].find(
      collection => collection.fetchStatus === 'failed'
    )

    const { status } = this.state
    const isFetchingContext = status === FETCHING_CONTEXT

    const isReady = !hasError && !isFetching && !isFetchingContext
    const showTimeline = flag('home.timeline.show') // used in demo envs

    return (
      <div className="App" style={{ backgroundImage: `url(${backgroundURL})` }}>
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
          <MoveModal />
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

App.contextTypes = {
  store: PropTypes.object
}

/*
withRouter is necessary here to deal with redux
https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
*/
export default withClient(withRouter(withCustomWallpaper(appEntryPoint(App))))
