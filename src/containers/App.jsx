import React, { useEffect, useState } from 'react'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'

import { Q, withClient } from 'cozy-client'
import flag, { enable as enableFlags } from 'cozy-flags'
import minilog from '@cozy/minilog'
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
import { useOpenApp } from 'hooks/useOpenApp'
import { BackgroundContainer } from 'components/BackgroundContainer'

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
  const [appsReady, setAppsReady] = useState(false)
  const [backgroundURL, setBackgroundURL] = useState(null)
  const webviewIntent = useWebviewIntent()
  const { getAppState } = useOpenApp()

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
    // if we already have the query, let's refresh in "background"
    // aka without loading state
    const alreadyRequestedContext = client.getQueryFromState(
      'io.cozy.settings/context'
    )
    if (
      !alreadyRequestedContext ||
      alreadyRequestedContext.fetchStatus !== 'loaded'
    ) {
      setStatus(FETCHING_CONTEXT)
    }

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
    setIsReady(
      appsReady && !hasError && !isFetching && !(status === FETCHING_CONTEXT)
    )
  }, [appsReady, hasError, isFetching, status])

  useEffect(() => {
    isReady && webviewIntent?.call('hideSplashScreen')
  }, [isReady, webviewIntent])

  return (
    <div
      className={`App ${getAppState} u-flex u-flex-column u-w-100 u-miw-100 u-flex-items-center`}
      style={{
        position: 'fixed',
        height: '100%'
      }}
    >
      <BackgroundContainer backgroundURL={backgroundURL} />

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
          {!isFetching && (
            <Switch>
              <Route
                path="/redirect"
                render={routeProps => <IntentRedirect {...routeProps} />}
              />
              <Route
                path="/connected"
                render={() => (
                  <Home
                    base="/connected"
                    wrapper={contentWrapper}
                    setAppsReady={() => setAppsReady(true)}
                  />
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
