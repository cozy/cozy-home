import React from 'react'
import { Outlet } from 'react-router-dom'

import flag from 'cozy-flags'
import CozyDevtools from 'cozy-devtools'
import { CozyConfirmDialogProvider } from 'cozy-harvest-lib'
import { Main, Content } from 'cozy-ui/transpiled/react/Layout'

import Applications from 'components/Applications'
import ScrollToTopOnMount from 'components/ScrollToTopOnMount'
import Services from 'components/Services'
import Shortcuts from 'components/Shortcuts'
import GroupedServices from 'components/GroupedServices'

const Home = ({ wrapper }) => {
  return (
    <CozyConfirmDialogProvider>
      <Main className="u-flex-grow-1">
        <ScrollToTopOnMount target={wrapper} />
        <Content className="u-flex u-flex-column u-ph-1">
          {flag('debug') && <CozyDevtools />}
          <Applications />
          <Shortcuts />
          {flag('home.detailed-services-dev') ? (
            <GroupedServices />
          ) : (
            <Services />
          )}
        </Content>
      </Main>
      <Outlet />
    </CozyConfirmDialogProvider>
  )
}

export default Home
