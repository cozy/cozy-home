/* global __DEVELOPMENT__ */

import React, { createContext } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import memoize from 'lodash/memoize'

import flag from 'cozy-flags'
import CozyClient, { CozyProvider } from 'cozy-client'
import I18n from 'cozy-ui/react/I18n'
import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme'

import { CozyProvider as LegacyCozyProvider } from 'lib/redux-cozy-client'
import configureStore from 'store/configureStore'
import homeConfig from 'config/home.json'
import { CozyClient as LegacyCozyClient } from 'lib/redux-cozy-client'

import schema from '../schema'

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
    token: data.cozyToken
  })

  cozyClient.registerPlugin(flag.plugin)

  const legacyClient = new LegacyCozyClient({
    cozyURL: `//${data.cozyDomain}`,
    token: data.cozyToken,
    cozyClient
  })

  // store
  const store = configureStore(legacyClient, cozyClient, context, {
    lang,
    ...homeConfig
  })

  return { cozyClient, store, data, lang, context }
})

/**
 * Setups the app context and creates all context providers and wrappers
 * for an app
 */
const AppWrapper = ({ children }) => {
  const appContext = setupAppContext()
  const { store, cozyClient, data, context, lang } = appContext
  return (
    <AppContext.Provider value={appContext}>
      <MuiCozyTheme>
        <CozyProvider client={cozyClient}>
          <LegacyCozyProvider
            store={store}
            client={cozyClient}
            domain={data.cozyDomain}
            secure={!__DEVELOPMENT__}
          >
            <ReduxProvider store={store}>
              <I18n lang={lang} dictRequire={dictRequire} context={context}>
                {children}
              </I18n>
            </ReduxProvider>
          </LegacyCozyProvider>
        </CozyProvider>
      </MuiCozyTheme>
    </AppContext.Provider>
  )
}

export default AppWrapper
