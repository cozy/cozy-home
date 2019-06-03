/* global cozy, __DEVELOPMENT__ */
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
import 'intro.js-fix-cozy/minified/introjs.min.css'
import 'styles/index.styl'

const lang = document.documentElement.getAttribute('lang') || 'en'
const context = window.context || 'cozy'

const ACCOUNTS_DOCTYPE = 'io.cozy.accounts'

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
    uri: `${window.location.protocol}//${data.cozyDomain}`,
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
      }
    },
    token: data.cozyToken
  })

  cozy.bar.init({
    appEditor: data.cozyAppEditor,
    appName: data.cozyAppName,
    cozyClient,
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
