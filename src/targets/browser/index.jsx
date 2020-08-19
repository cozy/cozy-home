/* global __DEVELOPMENT__ */
import 'cozy-ui/transpiled/react/stylesheet.css'

import memoize from 'lodash/memoize'
import React from 'react'
import { render } from 'react-dom'
import {
  CozyClient as LegacyCozyClient,
  CozyProvider as LegacyCozyProvider
} from 'lib/redux-cozy-client'
import 'url-search-params-polyfill'
import CozyClient, { CozyProvider } from 'cozy-client'
import { Application } from 'cozy-doctypes'
import { handleOAuthResponse } from 'cozy-harvest-lib'
import I18n from 'cozy-ui/react/I18n'
import { BreakpointsProvider } from 'cozy-ui/react/hooks/useBreakpoints'
import flag from 'cozy-flags'

import homeConfig from 'config/home.json'
import PiwikHashRouter from 'lib/PiwikHashRouter'
import configureStore from 'store/configureStore'

import 'cozy-ui/dist/cozy-ui.min.css'
import 'intro.js-fix-cozy/minified/introjs.min.css'
import 'styles/index.styl'

const lang = document.documentElement.getAttribute('lang') || 'en'
const context = window.context || 'cozy'

const ACCOUNTS_DOCTYPE = 'io.cozy.accounts'

const schema = {
  app: Application.schema,
  accounts: {
    doctype: ACCOUNTS_DOCTYPE,
    attributes: {},
    relationships: {
      master: {
        type: 'has-one',
        doctype: ACCOUNTS_DOCTYPE
      }
    }
  },
  permissions: {
    doctype: 'io.cozy.permissions',
    attributes: {}
  },
  triggers: {
    doctype: 'io.cozy.triggers'
  },
  jobs: {
    doctype: 'io.cozy.jobs'
  }
}

/**
 * Setups clients and store
 *
 * Is memoized to avoid several clients in case of hot-reload
 */
const setupAppContext = memoize(() => {
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

  return { cozyClient, store, data }
})

const renderApp = () => {
  if (handleOAuthResponse()) return

  const { cozyClient, store, data } = setupAppContext()
  const dictRequire = lang => require(`locales/${lang}.json`)
  const App = require('containers/App').default
  render(
    <CozyProvider client={cozyClient}>
      <LegacyCozyProvider
        store={store}
        client={cozyClient}
        domain={data.cozyDomain}
        secure={!__DEVELOPMENT__}
      >
        <I18n lang={lang} dictRequire={dictRequire} context={context}>
          <BreakpointsProvider>
            <PiwikHashRouter>
              <App {...homeConfig} />
            </PiwikHashRouter>
          </BreakpointsProvider>
        </I18n>
      </LegacyCozyProvider>
    </CozyProvider>,
    document.querySelector('[role=application]')
  )
}

document.addEventListener('DOMContentLoaded', () => {
  renderApp()
})

if (module.hot) {
  renderApp()
  module.hot.accept()
}
