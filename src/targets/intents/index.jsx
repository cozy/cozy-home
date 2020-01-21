/* global __DEVELOPMENT__ */
import React from 'react'
import { render } from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import 'cozy-ui/transpiled/react/stylesheet.css'
import 'cozy-ui/dist/cozy-ui.min.css'
import CozyClient, { CozyProvider } from 'cozy-client'
import { I18n } from 'cozy-ui/react/I18n'

import configureStore from 'store/configureStore'

import schema from 'schema'

import IntentHandler from 'containers/IntentHandler'

import 'styles/intents.styl'

const lang = document.documentElement.getAttribute('lang') || 'en'

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('[role=application]')
  const appData = root.dataset

  // New improvements must be done with CozyClient
  const cozyClient = new MostRecentCozyClient({
    uri: `${window.location.protocol}//${appData.cozyDomain}`,
    schema,
    token: appData.cozyToken
  })

  // store
  const store = configureStore(cozyClient, {
    lang
  })

  cozyClient.setStore(store)

  render(
    <CozyProvider client={cozyClient}>
      <Provider store={store}>
        <I18n lang={lang} dictRequire={lang => require(`locales/${lang}`)}>
          <HashRouter>
            <IntentHandler appData={appData} />
          </HashRouter>
        </I18n>
      </Provider>
    </CozyProvider>,
    document.querySelector('[role=application]')
  )
})
