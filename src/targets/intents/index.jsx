import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import { HashRouter } from 'react-router-dom'

import { I18n } from 'cozy-ui/react/I18n'
import configureStore from 'store/configureStore'
import { CozyClient, CozyProvider } from 'redux-cozy-client'

import IntentHandler from 'containers/IntentHandler'

import 'styles/services.styl'

const lang = document.documentElement.getAttribute('lang') || 'en'
const context = window.context || 'cozy'

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('[role=application]')
  const appData = root.dataset

  const client = new CozyClient({
    cozyURL: `//${appData.cozyDomain}`,
    token: appData.cozyToken
  })

  // store
  const store = configureStore(client, context, { lang })

  render(
    <CozyProvider store={store} client={client}>
      <I18n
        lang={lang}
        dictRequire={lang => require(`locales/${lang}`)}
        context={context}
      >
        <HashRouter>
          <IntentHandler appData={appData} />
        </HashRouter>
      </I18n>
    </CozyProvider>,
    document.querySelector('[role=application]')
  )
})
