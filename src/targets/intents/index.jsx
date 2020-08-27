/* global __DEVELOPMENT__ */
import 'cozy-ui/transpiled/react/stylesheet.css'
import 'cozy-ui/dist/cozy-ui.min.css'
import 'styles/intents.styl'

import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { render } from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { CozyProvider } from 'cozy-client'
import { I18n } from 'cozy-ui/react/I18n'

import { CozyProvider as LegacyCozyProvider } from 'lib/redux-cozy-client'

import IntentHandler from 'containers/IntentHandler'
import { setupAppContext } from '../../appContext'

document.addEventListener('DOMContentLoaded', () => {
  const { cozyClient, data, store, lang, context } = setupAppContext()

  const dictRequire = lang => require(`locales/${lang}.json`)

  render(
    <CozyProvider client={cozyClient}>
      <LegacyCozyProvider
        domain={data.cozyDomain}
        store={store}
        client={cozyClient}
        secure={!__DEVELOPMENT__}
      >
        <ReduxProvider store={store}>
          <I18n lang={lang} dictRequire={dictRequire} context={context}>
            <HashRouter>
              <IntentHandler appData={data} />
            </HashRouter>
          </I18n>
        </ReduxProvider>
      </LegacyCozyProvider>
    </CozyProvider>,
    document.querySelector('[role=application]')
  )
})
