import 'cozy-ui/transpiled/react/stylesheet.css'
import 'cozy-ui/dist/cozy-ui.utils.min.css'
import 'intro.js-fix-cozy/minified/introjs.min.css'
import 'styles/index.styl'
import 'url-search-params-polyfill'

import React from 'react'
import { HashRouter } from 'react-router-dom'

import { handleOAuthResponse } from 'cozy-harvest-lib'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import { WebviewIntentProvider } from 'cozy-intent'

import AppWrapper from 'components/AppWrapper'
import { closeApp, openApp } from 'hooks/useOpenApp'
import { Root } from 'react-dom/client'

export const renderApp = (root?: Root): void => {
  if (handleOAuthResponse()) {
    root?.render(<Spinner size="xxlarge" middle={true} />)
    return
  }

  // eslint-disable-next-line
  const AnimatedWrapper = require('components/AnimatedWrapper').default as () => JSX.Element

  root?.render(
    <WebviewIntentProvider methods={{ openApp, closeApp }}>
      <AppWrapper>
        <BreakpointsProvider>
          <HashRouter>
            <AnimatedWrapper />
          </HashRouter>
        </BreakpointsProvider>
      </AppWrapper>
    </WebviewIntentProvider>
  )
}
