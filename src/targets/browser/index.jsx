import 'cozy-ui/transpiled/react/stylesheet.css'
import 'cozy-ui/dist/cozy-ui.utils.min.css'

import 'intro.js-fix-cozy/minified/introjs.min.css'
import 'styles/index.styl'

import React from 'react'
import { render } from 'react-dom'
import 'url-search-params-polyfill'
import { handleOAuthResponse } from 'cozy-harvest-lib'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import { WebviewIntentProvider } from 'cozy-intent'

import homeConfig from 'config/home.json'
import AppWrapper from 'components/AppWrapper'
import PiwikHashRouter from 'lib/PiwikHashRouter'

const renderApp = () => {
  if (handleOAuthResponse()) return
  const App = require('containers/App').default
  render(
    <AppWrapper>
      <BreakpointsProvider>
        <PiwikHashRouter>
          <WebviewIntentProvider>
            <App {...homeConfig} />
          </WebviewIntentProvider>
        </PiwikHashRouter>
      </BreakpointsProvider>
    </AppWrapper>,
    document.querySelector('[role=application]')
  )
}

document.addEventListener('DOMContentLoaded', () => {
  renderApp()
})

if (module.hot) {
  renderApp()
  module.hot.accept()
}

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .getRegistrations()
      .then(async registrations => {
        for (let registration of registrations) {
          await registration.unregister()
        }
        // eslint-disable-next-line no-console
        return console.info('Service worker unregistered')
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('Error during service worker registration:', error)
      })
  })
}
