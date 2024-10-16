/* global __SIMULATE_FLAGSHIP__ */
import React, { useEffect, useState } from 'react'
import { Navigate, Route } from 'react-router-dom'

import flag, { enable as enableFlags } from 'cozy-flags'
import minilog from 'cozy-minilog'
import { useQuery } from 'cozy-client'
import { useWebviewIntent } from 'cozy-intent'
import { isFlagshipApp } from 'cozy-device-helper'

import IconSprite from 'cozy-ui/transpiled/react/Icon/Sprite'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import { Main } from 'cozy-ui/transpiled/react/Layout'
import { useCozyTheme } from 'cozy-ui/transpiled/react/providers/CozyTheme'

import AssistantDialog from 'assistant/Views/AssistantDialog'
import SearchDialog from 'assistant/Views/SearchDialog'
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
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { BackgroundContainer } from 'components/BackgroundContainer'
import { FLAG_FAB_BUTTON_ENABLED } from 'components/AddButton/helpers'
import { MainView } from 'components/MainView'
import { toFlagNames } from './toFlagNames'
import { Konnector } from 'components/Konnector'
import DefaultRedirectionSnackbar from 'components/DefaultRedirectionSnackbar/DefaultRedirectionSnackbar'
import ReloadFocus from './ReloadFocus'
import FooterLogo from 'components/FooterLogo/FooterLogo'
import { formatShortcuts } from 'components/Shortcuts/utils'
import {
  mkHomeMagicFolderConn,
  mkHomeCustomShorcutsConn,
  mkHomeCustomShorcutsDirConn,
  contextQuery
} from 'queries'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import SectionDialog from 'components/Sections/SectionDialog'
import { SentryRoutes } from 'lib/sentry'

window.flag = window.flag || flag
window.minilog = minilog

const App = ({ accounts, konnectors, triggers }) => {
  const { isMobile } = useBreakpoints()
  const [contentWrapper, setContentWrapper] = useState(undefined)
  const [isFetching, setIsFetching] = useState(
    [accounts, konnectors, triggers].some(collection =>
      ['pending', 'loading'].includes(collection.fetchStatus)
    )
  )
  const [hasError, setHasError] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [appsReady, setAppsReady] = useState(false)
  const webviewIntent = useWebviewIntent()
  const theme = useCozyTheme()

  const { t } = useI18n()

  const homeMagicFolderConn = mkHomeMagicFolderConn(t)
  const { data: magicFolder } = useQuery(
    homeMagicFolderConn.query,
    homeMagicFolderConn
  )
  const magicHomeFolderId = magicFolder?.[0]?._id

  const homeShortcutsDirConn = mkHomeCustomShorcutsDirConn({
    currentFolderId: magicHomeFolderId
  })
  const canHaveShortcuts = !!magicHomeFolderId
  const { data: folders } = useQuery(homeShortcutsDirConn.query, {
    ...homeShortcutsDirConn.options,
    enabled: canHaveShortcuts
  })
  const customHomeShortcutsConn = mkHomeCustomShorcutsConn(
    folders && folders.map(folder => folder._id)
  )
  const { data: customHomeShortcuts } = useQuery(
    customHomeShortcutsConn.query,
    {
      ...customHomeShortcutsConn,
      enabled: Boolean(folders && folders.length > 0)
    }
  )
  const shortcutsDirectories = canHaveShortcuts
    ? formatShortcuts(folders, customHomeShortcuts)
    : null
  const context = useQuery(contextQuery.definition, contextQuery.options)

  useEffect(() => {
    setIsFetching(
      [accounts, konnectors, triggers, context].some(collection =>
        ['pending', 'loading'].includes(collection.fetchStatus)
      )
    )
    setHasError(
      [accounts, konnectors, triggers, context].find(
        collection => collection.fetchStatus === 'failed'
      )
    )
  }, [accounts, konnectors, triggers, context])

  if (context?.attributes?.features) {
    const flags = toFlagNames(context.attributes.features)
    enableFlags(flags)
  }
  useEffect(() => {
    setIsReady(
      appsReady &&
        !hasError &&
        !isFetching &&
        shortcutsDirectories !== undefined
    )
  }, [appsReady, hasError, isFetching, shortcutsDirectories])

  useEffect(() => {
    if (isReady && webviewIntent) {
      webviewIntent.call('setTheme', theme.variant)
      webviewIntent.call('hideSplashScreen')
    }
    if (isReady && !webviewIntent && __SIMULATE_FLAGSHIP__) {
      document.getElementById('splashscreen').style.display = 'none'
    }
  }, [isReady, theme, webviewIntent])

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
          <MoveModal />
          <HeroHeader />
          {hasError && (
            <Main className="u-flex u-flex-items-center u-flex-justify-center">
              <Failure errorType="initial" />
            </Main>
          )}
          {isFetching && (
            <Main className="u-flex u-flex-items-center u-flex-justify-center">
              <Spinner size="xxlarge" />
            </Main>
          )}
          {!isFetching && (
            <>
              <SentryRoutes>
                <Route
                  path="/connected"
                  element={
                    <Home
                      wrapper={contentWrapper}
                      setAppsReady={() => setAppsReady(true)}
                      shortcutsDirectories={shortcutsDirectories}
                    />
                  }
                >
                  <Route path="assistant" element={<AssistantDialog />} />
                  <Route path="search" element={<SearchDialog />} />

                  <Route path=":konnectorSlug/*" element={<Konnector />} />

                  <Route path="categories/*">
                    <Route path=":type/:category" element={<SectionDialog />} />
                  </Route>

                  <Route path="providers" element={<StoreRedirection />}>
                    <Route path=":category" element={<StoreRedirection />} />
                  </Route>
                </Route>

                <Route path="/redirect" element={<IntentRedirect />} />

                <Route path="*" element={<Navigate to="connected" />} />
              </SentryRoutes>
            </>
          )}
          <IconSprite />
        </div>
        <FooterLogo />
      </MainView>
      {isFlagshipApp() && <DefaultRedirectionSnackbar />}
      {flag(FLAG_FAB_BUTTON_ENABLED) && isMobile && <AddButton />}
    </>
  )
}

export default appEntryPoint(App)
