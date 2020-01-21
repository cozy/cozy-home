/* global __DEVELOPMENT__ */
import React from 'react'
import { render } from 'react-dom'
import { CozyClient, CozyProvider } from 'redux-cozy-client'
import 'url-search-params-polyfill'
import MostRecentCozyClient, {
  CozyProvider as MostRecentCozyClientProvider
} from 'cozy-client'
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
const context = window.context || 'cozy'

document.addEventListener('DOMContentLoaded', () => {
  if (handleOAuthResponse()) return

  const root = document.querySelector('[role=application]')
  const data = root.dataset

  const legacyClient = new CozyClient({
    cozyURL: `//${data.cozyDomain}`,
    token: data.cozyToken
  })

  // New improvements must be done with CozyClient
  const cozyClient = new MostRecentCozyClient({
    uri: `${window.location.protocol}//${data.cozyDomain}`,
    schema,
    token: data.cozyToken
  })

  // store
  const store = configureStore(legacyClient, cozyClient, context, {
    lang,
    ...collectConfig
  })

  const dictRequire = lang => require(`locales/${lang}`)
  const App = require('containers/App').default
  render(
    <MostRecentCozyClientProvider client={cozyClient}>
      <CozyProvider
        store={store}
        client={cozyClient}
        domain={data.cozyDomain}
        secure={!__DEVELOPMENT__}
      >
        <I18n lang={lang} dictRequire={dictRequire} context={context}>
          <PiwikHashRouter>
            <App {...collectConfig} />
          </PiwikHashRouter>
        </I18n>
      </CozyProvider>
    </MostRecentCozyClientProvider>,
    document.querySelector('[role=application]')
  )
})
