/* global __DEVELOPMENT__ */
import 'cozy-ui/transpiled/react/stylesheet.css'
import 'cozy-ui/dist/cozy-ui.min.css'
import 'intro.js-fix-cozy/minified/introjs.min.css'
import 'styles/index.styl'

import React from 'react'
import { render } from 'react-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { CozyProvider as LegacyCozyProvider } from 'lib/redux-cozy-client'
import 'url-search-params-polyfill'
import { CozyProvider } from 'cozy-client'
import { handleOAuthResponse } from 'cozy-harvest-lib'
import I18n from 'cozy-ui/react/I18n'
import { BreakpointsProvider } from 'cozy-ui/react/hooks/useBreakpoints'
import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme'

import homeConfig from 'config/home.json'
import { setupAppContext } from '../../appContext'
import PiwikHashRouter from 'lib/PiwikHashRouter'

const renderApp = () => {
  if (handleOAuthResponse()) return

  const {
    cozyClient,
    legacyClient,
    store,
    data,
    lang,
    context
  } = setupAppContext()
  const dictRequire = lang => require(`locales/${lang}.json`)
  const App = require('containers/App').default
  render(
    <MuiCozyTheme>
      <CozyProvider client={cozyClient}>
        <LegacyCozyProvider
          store={store}
          client={legacyClient}
          domain={data.cozyDomain}
          secure={!__DEVELOPMENT__}
        >
          <ReduxProvider store={store}>
            <I18n lang={lang} dictRequire={dictRequire} context={context}>
              <BreakpointsProvider>
                <PiwikHashRouter>
                  <App {...homeConfig} />
                </PiwikHashRouter>
              </BreakpointsProvider>
            </I18n>
          </ReduxProvider>
        </LegacyCozyProvider>
      </CozyProvider>
    </MuiCozyTheme>,
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
