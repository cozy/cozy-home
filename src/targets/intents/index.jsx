import 'cozy-ui/transpiled/react/stylesheet.css'
import 'cozy-ui/dist/cozy-ui.utils.min.css'
import 'styles/intents.styl'

import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import IntentHandler from 'containers/IntentHandler'
import AppWrapper, { AppContext } from 'components/AppWrapper'

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('[role=application]')
  const root = createRoot(container)

  root.render(
    <AppWrapper>
      <HashRouter>
        <AppContext.Consumer>
          {({ data }) => <IntentHandler appData={data} />}
        </AppContext.Consumer>
      </HashRouter>
    </AppWrapper>
  )
})
