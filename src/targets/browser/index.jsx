/* global cozy */
import 'babel-polyfill'
import 'url-search-params-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { CozyClient, CozyProvider } from 'redux-cozy-client'

import I18n from 'cozy-ui/react/I18n'
import PiwikHashRouter from 'lib/PiwikHashRouter'

import App from 'containers/App'
import collectConfig from 'config/collect'
import configureStore from 'store/configureStore'

import 'styles/index.styl'

const lang = document.documentElement.getAttribute('lang') || 'en'
const context = window.context || 'cozy'

const handleOAuthResponse = () => {
  /* global URLSearchParams */
  const queryParams = new URLSearchParams(window.location.search)
  if (queryParams.get('account')) {
    const opener = window.opener
    const accountKey = queryParams.get('account')
    const targetOrigin =
      window.location.origin ||
      `${window.location.protocol}//${window.location.hostname}${
        window.location.port ? ':' + window.location.port : ''
      }`
    opener.postMessage(
      {
        key: accountKey,
        origin: window.name
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

  cozy.bar.init({
    appEditor: data.cozyAppEditor,
    appName: data.cozyAppName,
    iconPath: data.cozyIconPath,
    lang: data.cozyLocale,
    replaceTitleOnMobile: true
  })

  // store
  const store = configureStore(client, context, {
    ...collectConfig
  })

  const dictRequire = lang => require(`locales/${lang}`)

  render(
    <CozyProvider store={store} client={client}>
      <I18n lang={lang} dictRequire={dictRequire} context={context}>
        <PiwikHashRouter>
          <App {...collectConfig} />
        </PiwikHashRouter>
      </I18n>
    </CozyProvider>,
    document.querySelector('[role=application]')
  )
})
