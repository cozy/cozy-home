import React, { useEffect, useState } from 'react'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
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
import Corner from 'components/HeroHeader/Corner'
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
const App = ({
  client,
  accounts,
  konnectors,
  triggers,
  wallpaperFetchStatus,
  wallpaperLink
}) => {
  const [status, setStatus] = useState(IDLE)
  const [contentWrapper, setContentWrapper] = useState(undefined)
  const [isFetching, setIsFetching] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [backgroundURL, setBackgroundURL] = useState(null)

  const showTimeline = flag('home.timeline.show') // used in demo envs

  useEffect(() => {
    const { cozyDefaultWallpaper } = client.getInstanceOptions()
    setBackgroundURL(wallpaperLink || cozyDefaultWallpaper)
  }, [wallpaperLink, wallpaperFetchStatus, client])

  useEffect(() => {
    setIsFetching(
      [accounts, konnectors, triggers].find(collection =>
        ['pending', 'loading'].includes(collection.fetchStatus)
      )
    )
    setHasError(
      [accounts, konnectors, triggers].find(
        collection => collection.fetchStatus === 'failed'
      )
    )
  }, [accounts, konnectors, triggers])

  useEffect(() => {
    setStatus(FETCHING_CONTEXT)

    const context = client
      .getStackClient()
      .fetchJSON('GET', '/settings/context')
    if (context && context.attributes && context.attributes.features) {
      const flags = toFlagNames(context.attributes.features)
      enableFlags(flags)
    }

    setStatus(IDLE)
  }, [client])

  useEffect(() => {
    setIsReady(!hasError && !isFetching && !(status === FETCHING_CONTEXT))
  }, [hasError, isFetching, status])

  return (
    <div
      className="App u-flex u-flex-column u-w-100 u-miw-100 u-flex-items-center"
      style={{ backgroundImage: `url(${backgroundURL})` }}
    >
      <Corner />
      <div
        className="u-flex u-flex-column u-flex-content-start u-flex-content-stretch u-w-100 u-m-auto u-pos-relative"
        ref={isReady ? div => setContentWrapper(div) : null}
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
              render={() => <Home base="/connected" wrapper={contentWrapper} />}
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

/*
withRouter is necessary here to deal with redux
https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
*/
export default withClient(withRouter(withCustomWallpaper(appEntryPoint(App))))
