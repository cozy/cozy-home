/* global cozy, __DEVELOPMENT__ */
import 'url-search-params-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { CozyClient, CozyProvider } from 'redux-cozy-client'
import MostRecentCozyClient, {
  CozyProvider as MostRecentCozyClientProvider
} from 'cozy-client'

import I18n from 'cozy-ui/react/I18n'
import PiwikHashRouter from 'lib/PiwikHashRouter'

import collectConfig from 'config/collect'
import configureStore from 'store/configureStore'

import 'intro.js-fix-cozy/minified/introjs.min.css'
import 'styles/index.styl'

const lang = document.documentElement.getAttribute('lang') || 'en'
const context = window.context || 'cozy'

const handleOAuthResponse = () => {
  /* global URLSearchParams */
  const queryParams = new URLSearchParams(window.location.search)
  if (queryParams.get('account')) {
    const opener = window.opener
    const accountKey = queryParams.get('account')
    const OAuthStateKey = queryParams.get('state')
    const targetOrigin =
      window.location.origin ||
      `${window.location.protocol}//${window.location.hostname}${
        window.location.port ? ':' + window.location.port : ''
      }`
    opener.postMessage(
      {
        key: accountKey,
        OAuthStateKey
      },
      targetOrigin
    )
    window.close()
  }
}

document.addEventListener('DOMContentLoaded', () => {
  handleOAuthResponse()

  const root = document.querySelector('[role=application]')
  const data = root.dataset

  const client = new CozyClient({
    cozyURL: `//${data.cozyDomain}`,
    token: data.cozyToken
  })

  // New improvements must be done with CozyClient
  const cozyClient = new MostRecentCozyClient({
    uri: `//${data.cozyDomain}`,
    token: data.cozyToken
  })

  cozy.bar.init({
    appEditor: data.cozyAppEditor,
    appName: data.cozyAppName,
    iconPath: data.cozyIconPath,
    lang: data.cozyLocale,
    replaceTitleOnMobile: false
  })

  // store
  const store = configureStore(client, context, {
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
