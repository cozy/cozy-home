import 'cozy-ui/transpiled/react/stylesheet.css'
import 'cozy-ui/dist/cozy-ui.utils.min.css'
import 'styles/intents.styl'
import { Route, Routes } from 'react-router-dom'
import { HarvestRoutes } from './HarvestRoute'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import IntentHandler from 'containers/IntentHandler'
import AppWrapper, { AppContext } from 'components/AppWrapper'

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('[role=application]')
  const root = createRoot(container)
  //
  const params = new URL(document.location).searchParams
  const intentId = params.get('intent')
  root.render(
    <AppWrapper>
      <HashRouter>
        <AppContext.Consumer>
          {({ data }) => (
            <Routes>
              <Route path="/" element={<IntentHandler appData={data} />} />
              <Route
                path=":konnectorSlug/*"
                element={
                  <HarvestRoutes intentData={data} intentId={intentId} />
                }
              />
            </Routes>
          )}
        </AppContext.Consumer>
      </HashRouter>
    </AppWrapper>
  )
})
