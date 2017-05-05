import 'babel-polyfill'
/* global cozy */
import React from 'react'
import { render } from 'react-dom'

import { I18n } from './plugins/preact-polyglot'
import DataConnectStore, { Provider } from './lib/DataConnectStore'

import IntentService from './containers/IntentService'

import './styles/services.styl'

const lang = document.documentElement.getAttribute('lang') || 'en'
const context = window.context || 'cozy'

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('[role=application]')
  const data = root.dataset
  cozy.client.init({
    cozyURL: '//' + data.cozyDomain,
    token: data.cozyToken
  })

  // store
  window.initKonnectors = require('./initKonnectors.json')
  window.initFolders = require('./initFolders.json')

  const store = new DataConnectStore(window.initKonnectors, window.initFolders, context)

  render((
    <Provider store={store}>
      <I18n context={context} locale={lang}>
        <IntentService window={window} data={data} />
      </I18n>
    </Provider>
  ), document.querySelector('[role=application]'))
})
