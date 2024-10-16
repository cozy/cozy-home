import React, { createContext } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import memoize from 'lodash/memoize'

import flag from 'cozy-flags'
import CozyClient, { CozyProvider, RealTimeQueries } from 'cozy-client'
import CozyDevtools from 'cozy-client/dist/devtools'
import I18n from 'cozy-ui/transpiled/react/providers/I18n'
import CozyTheme from 'cozy-ui/transpiled/react/providers/CozyTheme'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { PersistGate } from 'redux-persist/integration/react'
import AlertProvider from 'cozy-ui/transpiled/react/providers/Alert'
import { useCozyTheme } from 'cozy-ui/transpiled/react/providers/CozyTheme'

import configureStore from 'store/configureStore'
import { RealtimePlugin } from 'cozy-realtime'
// import { isFlagshipApp } from 'cozy-device-helper'

import { useWallpaperContext } from 'hooks/useWallpaperContext'

import schema from '../schema'
import { ConditionalWrapper } from './ConditionalWrapper'
import AssistantProvider from 'assistant/AssistantProvider'
import SearchProvider from 'assistant/Search/SearchProvider'
import { WallPaperProvider } from 'hooks/useWallpaperContext'
import { SectionsProvider } from './Sections/SectionsContext'
const dictRequire = lang => require(`locales/${lang}.json`)

export const AppContext = createContext()

/**
 * Setups clients and store
 *
 * Is memoized to avoid several clients in case of hot-reload
 */
export const setupAppContext = memoize(() => {
  const lang = document.documentElement.getAttribute('lang') || 'en'
  const context = window.context || 'cozy'
  const root = document.querySelector('[role=application]')
  const data = root.dataset

  // New improvements must be done with CozyClient
  const cozyClient = new CozyClient({
    uri: `${window.location.protocol}//${data.cozyDomain}`,
    schema,
    token: data.cozyToken,
    store: false,
    backgroundFetching: /*       isFlagshipApp() || */ flag(
      'home.store.persist'
    )
      ? true
      : false
  })

  cozyClient.registerPlugin(flag.plugin)
  cozyClient.registerPlugin(RealtimePlugin)
  // store
  const { store, persistor } = configureStore(cozyClient)
  cozyClient.setStore(store)

  return { cozyClient, store, data, lang, context, persistor }
})

const Inner = ({ children, lang, context }) => (
  <I18n lang={lang} dictRequire={dictRequire} context={context}>
    <SectionsProvider>
      {children}
      <RealTimeQueries doctype="io.cozy.ai.chat.conversations" />
      <RealTimeQueries doctype="io.cozy.apps" />
      <RealTimeQueries doctype="io.cozy.jobs" />
      <RealTimeQueries doctype="io.cozy.triggers" />
      <RealTimeQueries doctype="io.cozy.konnectors" />
      <RealTimeQueries doctype="io.cozy.settings" />
      {flag('debug') ? <CozyDevtools /> : null}
    </SectionsProvider>
  </I18n>
)

const ThemeProvider = ({ children }) => {
  const {
    data: { isCustomWallpaper }
  } = useWallpaperContext()
  const { type } = useCozyTheme()

  const variant = isCustomWallpaper
    ? type === 'light'
      ? 'inverted'
      : 'normal'
    : 'normal'

  return (
    <CozyTheme
      variant={variant}
      className="u-flex u-flex-column u-w-100 u-miw-100 u-flex-items-center"
    >
      {children}
    </CozyTheme>
  )
}

/**
 * Setups the app context and creates all context providers and wrappers
 * for an app
 */
const AppWrapper = ({ children }) => {
  const appContext = setupAppContext()
  const { store, cozyClient, context, lang, persistor } = appContext

  return (
    <AppContext.Provider value={appContext}>
      <BreakpointsProvider>
        <CozyProvider client={cozyClient}>
          <WallPaperProvider>
            <CozyTheme>
              <ThemeProvider>
                <AlertProvider>
                  <AssistantProvider>
                    <SearchProvider>
                      <ReduxProvider store={store}>
                        <ConditionalWrapper
                          condition={persistor}
                          wrapper={children => (
                            <PersistGate loading={null} persistor={persistor}>
                              {children}
                            </PersistGate>
                          )}
                        >
                          <Inner lang={lang} context={context}>
                            {children}
                          </Inner>
                        </ConditionalWrapper>
                      </ReduxProvider>
                    </SearchProvider>
                  </AssistantProvider>
                </AlertProvider>
              </ThemeProvider>
            </CozyTheme>
          </WallPaperProvider>
        </CozyProvider>
      </BreakpointsProvider>
    </AppContext.Provider>
  )
}

export default React.memo(AppWrapper)
