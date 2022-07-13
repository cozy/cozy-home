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
import { closeApp, openApp } from 'hooks/useOpenApp'

const renderApp = () => {
  if (handleOAuthResponse()) return
  const App = require('containers/App').default
  render(
    <WebviewIntentProvider methods={{ openApp, closeApp }}>
      <AppWrapper>
        <BreakpointsProvider>
          <PiwikHashRouter>
            <App {...homeConfig} />
          </PiwikHashRouter>
        </BreakpointsProvider>
      </AppWrapper>
    </WebviewIntentProvider>,
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
