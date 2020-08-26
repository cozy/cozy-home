import 'cozy-ui/transpiled/react/stylesheet.css'
import 'cozy-ui/dist/cozy-ui.min.css'
import 'intro.js-fix-cozy/minified/introjs.min.css'
import 'styles/index.styl'

import React from 'react'
import { render } from 'react-dom'
import 'url-search-params-polyfill'
import { handleOAuthResponse } from 'cozy-harvest-lib'
import { BreakpointsProvider } from 'cozy-ui/react/hooks/useBreakpoints'

import homeConfig from 'config/home.json'
import { setupAppContext } from '../../appContext'
import AppWrapper from 'components/AppWrapper'
import PiwikHashRouter from 'lib/PiwikHashRouter'

const renderApp = () => {
  if (handleOAuthResponse()) return

  const appContext = setupAppContext()
  const App = require('containers/App').default
  render(
    <AppWrapper {...appContext}>
      <BreakpointsProvider>
        <PiwikHashRouter>
          <App {...homeConfig} />
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
