import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'

import 'cozy-ui/dist/cozy-ui.min.css'
import 'cozy-ui/dist/cozy-ui.utils.min.css'
import IconSprite from 'cozy-ui/transpiled/react/Icon/Sprite'
import 'cozy-ui/transpiled/react/stylesheet.css'

import AppWrapper, { AppContext } from 'components/AppWrapper'
import IntentHandler from 'containers/IntentHandler'
import 'styles/intents.styl'

import { HarvestRoutes } from './HarvestRoute'

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
      <IconSprite />
    </AppWrapper>
  )
})
