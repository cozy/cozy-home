/* global __DEVELOPMENT__ */
import React from 'react'
import { render } from 'react-dom'
import 'url-search-params-polyfill'
import { Provider } from 'react-redux'

import CozyClient, { CozyProvider } from 'cozy-client'
import { Application } from 'cozy-doctypes'
import { handleOAuthResponse } from 'cozy-harvest-lib'
import I18n from 'cozy-ui/react/I18n'

import collectConfig from 'config/collect'
import PiwikHashRouter from 'lib/PiwikHashRouter'
import configureStore from 'store/configureStore'

import 'cozy-ui/transpiled/react/stylesheet.css'
import 'cozy-ui/dist/cozy-ui.min.css'
import 'intro.js-fix-cozy/minified/introjs.min.css'
import 'styles/index.styl'

import schema from 'schema'

const lang = document.documentElement.getAttribute('lang') || 'en'

document.addEventListener('DOMContentLoaded', () => {
  if (handleOAuthResponse()) return

  const root = document.querySelector('[role=application]')
  const data = root.dataset

  // New improvements must be done with CozyClient
  const cozyClient = new CozyClient({
    uri: `${window.location.protocol}//${data.cozyDomain}`,
    schema,
    token: data.cozyToken
  })

  // store
  const store = configureStore(cozyClient, {
    lang,
    ...collectConfig
  })

  cozyClient.setStore(store)

  const dictRequire = lang => require(`locales/${lang}`)
  const App = require('containers/App').default
  render(
    <CozyProvider client={cozyClient}>
      <Provider store={store}>
        <I18n lang={lang} dictRequire={dictRequire}>
          <PiwikHashRouter>
            <App {...collectConfig} />
          </PiwikHashRouter>
        </I18n>
      </Provider>
    </CozyProvider>,
    document.querySelector('[role=application]')
  )
})
