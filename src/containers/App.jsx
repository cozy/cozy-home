import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import flag, { enable as enableFlags } from 'cozy-flags'
import minilog from '@cozy/minilog'
import { Q, useClient } from 'cozy-client'
import { useWebviewIntent } from 'cozy-intent'
import { isFlagshipApp } from 'cozy-device-helper'

import Alerter from 'cozy-ui/transpiled/react/deprecated/Alerter'
import IconSprite from 'cozy-ui/transpiled/react/Icon/Sprite'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import { Main } from 'cozy-ui/transpiled/react/Layout'

import AddButton from 'components/AddButton/AddButton'
import Corner from 'components/HeroHeader/Corner'
import Failure from 'components/Failure'
import HeroHeader from 'components/HeroHeader'
import Home from 'components/Home'
import IntentRedirect from 'components/IntentRedirect'
import MoveModal from 'components/MoveModal'
import StoreRedirection from 'components/StoreRedirection'
import BackupNotification from 'components/BackupNotification/BackupNotification'
import appEntryPoint from 'components/appEntryPoint'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import { BackgroundContainer } from 'components/BackgroundContainer'
import { FLAG_FAB_BUTTON_ENABLED } from 'components/AddButton/helpers'
import { MainView } from 'components/MainView'
import { usePreferedTheme } from 'hooks/usePreferedTheme'
import { toFlagNames } from './toFlagNames'
import { Konnector } from 'components/Konnector'
import DefaultRedirectionSnackbar from 'components/DefaultRedirectionSnackbar/DefaultRedirectionSnackbar'
import ReloadFocus from './ReloadFocus'
const IDLE = 'idle'
const FETCHING_CONTEXT = 'FETCHING_CONTEXT'

window.flag = window.flag || flag
window.minilog = minilog

const App = ({ accounts, konnectors }) => {
  const client = useClient()
  const { isMobile } = useBreakpoints()
  const [status, setStatus] = useState(IDLE)
  const [contentWrapper, setContentWrapper] = useState(undefined)
  const [isFetching, setIsFetching] = useState(
    [accounts, konnectors].some(collection =>
      ['pending', 'loading'].includes(collection.fetchStatus)
    )
  )
  const [hasError, setHasError] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [appsReady, setAppsReady] = useState(false)
  const webviewIntent = useWebviewIntent()
  const preferedTheme = usePreferedTheme()

  useEffect(() => {
    setIsFetching(
      [accounts, konnectors].some(collection =>
        ['pending', 'loading'].includes(collection.fetchStatus)
      )
    )
    setHasError(
      [accounts, konnectors].find(
        collection => collection.fetchStatus === 'failed'
      )
    )
  }, [accounts, konnectors])
  useEffect(() => {
    client.query(Q('io.cozy.triggers'))
    client.query(Q('io.cozy.jobs'))
    client.query(Q('io.cozy.accounts'))
  }, [])
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
        Q('io.cozy.settings').getById('io.cozy.settings.context')
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
    if (isReady && webviewIntent) {
      webviewIntent.call('setTheme', preferedTheme)
      webviewIntent.call('hideSplashScreen')
    }
  }, [isReady, preferedTheme, webviewIntent])

  return (
    <>
      <BackgroundContainer />
      <ReloadFocus />
      <MainView>
        <BackupNotification />
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
            <Routes>
              <Route
                path="/connected"
                element={
                  <Home
                    wrapper={contentWrapper}
                    setAppsReady={() => setAppsReady(true)}
                  />
                }
              >
                <Route path=":konnectorSlug/*" element={<Konnector />} />

                <Route path="providers" element={<StoreRedirection />}>
                  <Route path=":category" element={<StoreRedirection />} />
                </Route>
              </Route>

              <Route path="/redirect" element={<IntentRedirect />} />

              <Route path="*" element={<Navigate to="connected" />} />
            </Routes>
          )}
          <IconSprite />
        </div>
      </MainView>
      {isFlagshipApp() && <DefaultRedirectionSnackbar />}
      {flag(FLAG_FAB_BUTTON_ENABLED) && isMobile && <AddButton />}
    </>
  )
}

export default appEntryPoint(App)
