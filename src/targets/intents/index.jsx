import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import CozyClient, { CozyProvider } from 'cozy-client'
import { I18n } from 'cozy-ui/react/I18n'
import 'cozy-ui/transpiled/react/stylesheet.css'
import 'cozy-ui/dist/cozy-ui.min.css'

import schema from 'schema'
import configureStore from 'store/configureStore'

import IntentHandler from 'containers/IntentHandler'
import 'styles/intents.styl'

const lang = document.documentElement.getAttribute('lang') || 'en'

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('[role=application]')
  const appData = root.dataset

  const cozyClient = new CozyClient({
    uri: `${window.location.protocol}//${appData.cozyDomain}`,
    schema,
    token: appData.cozyToken
  })

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
