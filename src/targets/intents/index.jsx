import 'cozy-ui/transpiled/react/stylesheet.css'
import 'cozy-ui/dist/cozy-ui.utils.min.css'
import 'styles/intents.styl'

import React from 'react'
import { render } from 'react-dom'
import { HashRouter } from 'react-router-dom'
import IntentHandler from 'containers/IntentHandler'
import AppWrapper, { AppContext } from 'components/AppWrapper'

document.addEventListener('DOMContentLoaded', () => {
  render(
    <AppWrapper>
      <HashRouter>
        <AppContext.Consumer>
          {({ data }) => <IntentHandler appData={data} />}
        </AppContext.Consumer>
      </HashRouter>
    </AppWrapper>,
    document.querySelector('[role=application]')
  )
})
