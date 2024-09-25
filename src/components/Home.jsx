import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import flag from 'cozy-flags'
import CozyDevTools from 'cozy-client/dist/devtools'
import { CozyConfirmDialogProvider } from 'cozy-harvest-lib'
import { Main, Content } from 'cozy-ui/transpiled/react/Layout'

import Applications from 'components/Applications'
import ScrollToTopOnMount from 'components/ScrollToTopOnMount'
import Services from 'components/Services'
import Shortcuts from 'components/Shortcuts'
import GroupedServices from 'components/GroupedServices'
import { Announcements } from 'components/Announcements/Announcements'

const Home = ({ setAppsReady, wrapper }) => {
  const { pathname } = useLocation()

  return (
    <CozyConfirmDialogProvider>
      <Main className="u-flex-grow-1">
        <ScrollToTopOnMount target={wrapper} />
        {pathname === '/connected' && <Announcements />}
        <Content className="u-flex u-flex-column u-ph-1">
          {flag('debug') && <CozyDevTools />}
          <Applications onAppsFetched={setAppsReady} />
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
