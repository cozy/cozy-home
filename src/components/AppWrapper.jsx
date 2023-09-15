/* global __DEVELOPMENT__ */

import React, { createContext } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import memoize from 'lodash/memoize'

import flag from 'cozy-flags'
import CozyClient, { CozyProvider, RealTimeQueries } from 'cozy-client'
import CozyDevtools from 'cozy-client/dist/devtools'
import I18n from 'cozy-ui/transpiled/react/I18n'
import CozyTheme from 'cozy-ui/transpiled/react/CozyTheme'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import { PersistGate } from 'redux-persist/integration/react'

import {
  CozyClient as LegacyCozyClient,
  CozyProvider as LegacyCozyProvider
} from 'lib/redux-cozy-client'
import configureStore from 'store/configureStore'
import homeConfig from 'config/home.json'
import { RealtimePlugin } from 'cozy-realtime'
// import { isFlagshipApp } from 'cozy-device-helper'

import { usePreferedTheme } from 'hooks/usePreferedTheme'

import schema from '../schema'
import { ConditionalWrapper } from './ConditionalWrapper'
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
  const legacyClient = new LegacyCozyClient({
    cozyURL: `//${data.cozyDomain}`,
    token: data.cozyToken,
    cozyClient
  })
  cozyClient.registerPlugin(flag.plugin)
  cozyClient.registerPlugin(RealtimePlugin)
  // store
  const { store, persistor } = configureStore(
    legacyClient,
    cozyClient,
    context,
    {
      lang,
      ...homeConfig
    }
  )
  cozyClient.setStore(store)

  return { cozyClient, store, data, lang, context, persistor }
})

const Inner = ({ children, lang, context }) => (
  <I18n lang={lang} dictRequire={dictRequire} context={context}>
    {children}
    <RealTimeQueries doctype="io.cozy.apps" />
    <RealTimeQueries doctype="io.cozy.jobs" />
    <RealTimeQueries doctype="io.cozy.triggers" />
    {process.env.NODE_ENV !== 'production' ? <CozyDevtools /> : null}
  </I18n>
)

const ThemeProvider = ({ children }) => {
  const preferedTheme = usePreferedTheme()

  return (
    <CozyTheme
      variant={preferedTheme}
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
  const { store, cozyClient, data, context, lang, persistor } = appContext

  return (
    <AppContext.Provider value={appContext}>
      <BreakpointsProvider>
        <CozyProvider client={cozyClient}>
          <ThemeProvider>
            <LegacyCozyProvider
              store={store}
              client={cozyClient}
              domain={data.cozyDomain}
              secure={!__DEVELOPMENT__}
            >
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
            </LegacyCozyProvider>
          </ThemeProvider>
        </CozyProvider>
      </BreakpointsProvider>
    </AppContext.Provider>
  )
}

export default React.memo(AppWrapper)
