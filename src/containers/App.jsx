import React, { useEffect, useState } from 'react'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'

import { Q, withClient } from 'cozy-client'
import flag, { enable as enableFlags } from 'cozy-flags'
import minilog from '@cozy/minilog'
import { isFlagshipApp } from 'cozy-device-helper'
import { useWebviewIntent } from 'cozy-intent'

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
import { MainView } from 'components/MainView'
import withCustomWallpaper from 'hoc/withCustomWallpaper'
import { toFlagNames } from './toFlagNames'

const IDLE = 'idle'
const FETCHING_CONTEXT = 'FETCHING_CONTEXT'

window.flag = window.flag || flag
window.minilog = minilog

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
  const [isFetching, setIsFetching] = useState(
    [accounts, konnectors, triggers].some(collection =>
      ['pending', 'loading'].includes(collection.fetchStatus)
    )
  )
  const [hasError, setHasError] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [backgroundURL, setBackgroundURL] = useState(null)
  const webviewIntent = useWebviewIntent()

  useEffect(() => {
    const { cozyDefaultWallpaper } = client.getInstanceOptions()
    setBackgroundURL(wallpaperLink || cozyDefaultWallpaper)
  }, [wallpaperLink, wallpaperFetchStatus, client])

  useEffect(() => {
    setIsFetching(
      [accounts, konnectors, triggers].some(collection =>
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

    const fetchContext = async () => {
      const context = await client.query(
        Q('io.cozy.settings').getById('context')
      )
      if (context && context.attributes && context.attributes.features) {
        const flags = toFlagNames(context.attributes.features)
        enableFlags(flags)
      }
      setStatus(IDLE)
    }
    fetchContext()
  }, [client])

  useEffect(() => {
    setIsReady(!hasError && !isFetching && !(status === FETCHING_CONTEXT))
  }, [hasError, isFetching, status])

  useEffect(() => {
    if (isReady) {
      if (isFlagshipApp() && webviewIntent) {
        webviewIntent.call('hideSplashScreen')
      }
    }
  }, [webviewIntent, isReady])

  return (
    <div
      className="App u-flex u-flex-column u-w-100 u-miw-100 u-flex-items-center"
      style={{
        backgroundImage: `url(${backgroundURL})`,
        position: 'fixed',
        height: '100%'
      }}
    >
      <MainView>
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
                render={() => (
                  <Home base="/connected" wrapper={contentWrapper} />
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
      </MainView>
    </div>
  )
}

/*
withRouter is necessary here to deal with redux
https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
*/
export default withClient(withRouter(withCustomWallpaper(appEntryPoint(App))))
