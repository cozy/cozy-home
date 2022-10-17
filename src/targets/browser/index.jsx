import 'cozy-ui/transpiled/react/stylesheet.css'
import 'cozy-ui/dist/cozy-ui.utils.min.css'

import 'intro.js-fix-cozy/minified/introjs.min.css'
import 'styles/index.styl'

import React from 'react'
import { createRoot } from 'react-dom/client'
import 'url-search-params-polyfill'
import { handleOAuthResponse } from 'cozy-harvest-lib'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import { WebviewIntentProvider } from 'cozy-intent'

import AppWrapper from 'components/AppWrapper'
import PiwikHashRouter from 'lib/PiwikHashRouter'
import { closeApp, openApp } from 'hooks/useOpenApp'

const container = document.querySelector('[role=application]')
const root = createRoot(container)

const renderApp = () => {
  if (handleOAuthResponse()) {
    root.render(<Spinner size="xxlarge" middle={true} />)
    return
  }
  const AnimatedWrapper = require('components/AnimatedWrapper').default
  root.render(
    <WebviewIntentProvider methods={{ openApp, closeApp }}>
      <AppWrapper>
        <BreakpointsProvider>
          <PiwikHashRouter>
            <AnimatedWrapper />
          </PiwikHashRouter>
        </BreakpointsProvider>
      </AppWrapper>
    </WebviewIntentProvider>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  renderApp()
})

if (module.hot) {
  renderApp()
  module.hot.accept()
}
