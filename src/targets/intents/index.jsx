/* global __DEVELOPMENT__ */
import React from 'react'
import { render } from 'react-dom'
import { HashRouter } from 'react-router-dom'
import 'cozy-ui/transpiled/react/stylesheet.css'

import MostRecentCozyClient, {
  CozyProvider as MostRecentCozyClientProvider
} from 'cozy-client'
import { I18n } from 'cozy-ui/react/I18n'

import configureStore from 'store/configureStore'
import { CozyClient, CozyProvider } from 'redux-cozy-client'

import { Application } from 'cozy-doctypes'

import IntentHandler from 'containers/IntentHandler'

import 'styles/intents.styl'

const lang = document.documentElement.getAttribute('lang') || 'en'
const context = window.context || 'cozy'

const ACCOUNTS_DOCTYPE = 'io.cozy.accounts'

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('[role=application]')
  const appData = root.dataset

  const client = new CozyClient({
    cozyURL: `//${appData.cozyDomain}`,
    token: appData.cozyToken
  })

  // New improvements must be done with CozyClient
  const cozyClient = new MostRecentCozyClient({
    uri: `${window.location.protocol}//${appData.cozyDomain}`,
    schema: {
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
      }
    },
    token: appData.cozyToken
  })

  // store
  const store = configureStore(client, context, {
    lang
  })

  render(
    <MostRecentCozyClientProvider client={cozyClient}>
      <CozyProvider
        domain={appData.cozyDomain}
        store={store}
        client={cozyClient}
        secure={!__DEVELOPMENT__}
      >
        <I18n
          lang={lang}
          dictRequire={lang => require(`locales/${lang}`)}
          context={context}
        >
          <HashRouter>
            <IntentHandler appData={appData} />
          </HashRouter>
        </I18n>
      </CozyProvider>
    </MostRecentCozyClientProvider>,
    document.querySelector('[role=application]')
  )
})
