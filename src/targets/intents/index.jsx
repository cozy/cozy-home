import 'cozy-ui/transpiled/react/stylesheet.css'
import 'cozy-ui/dist/cozy-ui.min.css'
import 'styles/intents.styl'

import React from 'react'
import { render } from 'react-dom'
import { HashRouter } from 'react-router-dom'
import IntentHandler from 'containers/IntentHandler'
import AppWrapper from 'components/AppWrapper'
import { setupAppContext } from '../../appContext'

document.addEventListener('DOMContentLoaded', () => {
  const appContext = setupAppContext()

  render(
    <AppWrapper {...appContext}>
      <HashRouter>
        <IntentHandler appData={appContext.data} />
      </HashRouter>
    </AppWrapper>,
    document.querySelector('[role=application]')
  )
})
