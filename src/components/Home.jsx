import React from 'react'
import { Outlet } from 'react-router-dom'

import { CozyConfirmDialogProvider } from 'cozy-harvest-lib'
import { Main, Content } from 'cozy-ui/transpiled/react/Layout'

import Applications from 'components/Applications'
import ScrollToTopOnMount from 'components/ScrollToTopOnMount'
import Services from 'components/Services'
import Shortcuts from 'components/Shortcuts'

const Home = ({ setAppsReady, wrapper, shortcutsDirectories }) => {
  return (
    <CozyConfirmDialogProvider>
      <Main className="u-flex-grow-1">
        <ScrollToTopOnMount target={wrapper} />
        <Content className="u-flex u-flex-column u-ph-1">
          <Applications onAppsFetched={setAppsReady} />
          <Services />
          <Shortcuts shortcutsDirectories={shortcutsDirectories} />
        </Content>
      </Main>
      <Outlet />
    </CozyConfirmDialogProvider>
  )
}

export default Home
