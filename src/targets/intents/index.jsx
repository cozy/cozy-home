/* global __DEVELOPMENT__ */
import React from 'react'
import { render } from 'react-dom'
import { HashRouter } from 'react-router-dom'
import 'cozy-ui/transpiled/react/stylesheet.css'
import 'cozy-ui/dist/cozy-ui.min.css'
import { CozyProvider } from 'cozy-client'
import { I18n } from 'cozy-ui/react/I18n'

import { CozyProvider as LegacyCozyProvider } from 'lib/redux-cozy-client'

import IntentHandler from 'containers/IntentHandler'
import { setupAppContext } from '../../appContext'

import 'styles/intents.styl'

document.addEventListener('DOMContentLoaded', () => {
  const { client, data, store, lang, context } = setupAppContext()

  render(
    <CozyProvider client={client}>
      <LegacyCozyProvider
        domain={data.cozyDomain}
        store={store}
        client={client}
        secure={!__DEVELOPMENT__}
      >
        <I18n
          lang={lang}
          dictRequire={lang => require(`locales/${lang}`)}
          context={context}
        >
          <HashRouter>
            <IntentHandler appData={data} />
          </HashRouter>
        </I18n>
      </LegacyCozyProvider>
    </CozyProvider>,
    document.querySelector('[role=application]')
  )
})
