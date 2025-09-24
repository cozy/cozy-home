import React, { useState } from 'react'
import { Navigate, Route } from 'react-router-dom'
import { BarComponent } from 'cozy-bar'

import flag from 'cozy-flags'
import minilog from 'cozy-minilog'
import { useQuery } from 'cozy-client'
import { useWebviewIntent } from 'cozy-intent'
import { isFlagshipApp } from 'cozy-device-helper'

import IconSprite from 'cozy-ui/transpiled/react/Icon/Sprite'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import { Layout } from 'cozy-ui/transpiled/react/Layout'
import { useCozyTheme } from 'cozy-ui/transpiled/react/providers/CozyTheme'

import { AssistantMobileWrapper } from '@/components/Assistant/AssistantMobileWrapper'
import { AssistantDialog, SearchDialog } from 'cozy-search'
import Failure from '@/components/Failure'
import HeroHeader from '@/components/HeroHeader'
import Home from '@/components/Home'
import IntentRedirect from '@/components/IntentRedirect'
import MoveModal from '@/components/MoveModal'
import StoreRedirection from '@/components/StoreRedirection'
import BackupNotification from '@/components/BackupNotification/BackupNotification'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { BackgroundContainer } from '@/components/BackgroundContainer'
import { MainView } from '@/components/MainView'
import { Konnector } from '@/components/Konnector'
import DefaultRedirectionSnackbar from '@/components/DefaultRedirectionSnackbar/DefaultRedirectionSnackbar'
import ReloadFocus from './ReloadFocus'
import FooterLogo from '@/components/FooterLogo/FooterLogo'
import { formatShortcuts } from '@/components/Shortcuts/utils'
import {
  mkHomeMagicFolderConn,
  mkHomeCustomShorcutsConn,
  mkHomeCustomShorcutsDirConn
} from '@/queries'
import { useFetchInitialData } from '@/hooks/useFetchInitialData'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import SectionDialog from '@/components/Sections/SectionDialog'
import { SentryRoutes } from '@/lib/sentry'
import '../flags'

window.flag = window.flag || flag
window.minilog = minilog

const App = () => {
  const { isMobile } = useBreakpoints()
  const [contentWrapper, setContentWrapper] = useState(undefined)

  const [didInit, setDidInit] = useState(false)
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

  const { isFetching, hasError } = useFetchInitialData()

  const showAssistantForMobile = isFlagshipApp()
    ? flag('cozy.searchbar.enabled-for-flagship')
    : flag('cozy.searchbar.enabled') && isMobile

  if (
    !didInit &&
    !hasError &&
    !isFetching &&
    shortcutsDirectories !== undefined
  ) {
    if (webviewIntent) {
      webviewIntent.call('setTheme', theme.variant)
      webviewIntent.call('hideSplashScreen')
    }

    if (!webviewIntent && process.env.PUBLIC_SIMULATE_FLAGSHIP) {
      document.getElementById('splashscreen').style.display = 'none'
    }
    setDidInit(true)
  }

  return (
    <Layout monoColumn>
      <BarComponent
        searchOptions={{ enabled: false }}
        componentsProps={{
          Wrapper: { className: 'u-bg-transparent u-elevation-0' }
        }}
      />
      <BackgroundContainer />
      <ReloadFocus />
      <MainView>
        <BackupNotification />
        <div
          className="u-flex u-flex-column u-flex-content-start u-flex-content-stretch u-w-100 u-m-auto u-pos-relative"
          ref={didInit ? div => setContentWrapper(div) : null}
        >
          <MoveModal />
          <HeroHeader />
          {hasError && (
            <main className="u-flex u-flex-items-center u-flex-justify-center">
              <Failure errorType="initial" />
            </main>
          )}
          {isFetching && (
            <main className="u-flex u-flex-items-center u-flex-justify-center">
              <Spinner size="xxlarge" />
            </main>
          )}
          {!isFetching && (
            <>
              <SentryRoutes>
                <Route
                  path="/connected"
                  element={
                    <Home
                      wrapper={contentWrapper}
                      shortcutsDirectories={shortcutsDirectories}
                    />
                  }
                >
                  <Route
                    path="assistant/:conversationId"
                    element={<AssistantDialog />}
                  />
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
      {showAssistantForMobile && <AssistantMobileWrapper />}
      {isFlagshipApp() && <DefaultRedirectionSnackbar />}
    </Layout>
  )
}

export default App
