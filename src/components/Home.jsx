import React from 'react'
import { Outlet } from 'react-router-dom'

import { CozyConfirmDialogProvider } from 'cozy-harvest-lib'
import { Main, Content } from 'cozy-ui/transpiled/react/Layout'

import Applications from 'components/Applications'
import ScrollToTopOnMount from 'components/ScrollToTopOnMount'
import Services from 'components/Services'
import Shortcuts from 'components/Shortcuts'
import { SectionsView } from 'components/Sections/SectionsView'
import sections from 'components/Sections/sections.json' // TODO: to be fetched from home settings
import flags from 'components/Sections/flags.json' // TODO: to be fetched from cozy-flags

const Home = ({ setAppsReady, wrapper, shortcutsDirectories }) => {
  return (
    <CozyConfirmDialogProvider>
      <Main className="u-flex-grow-1">
        <ScrollToTopOnMount target={wrapper} />
        <Content className="u-flex u-flex-column u-ph-1">
          <Applications onAppsFetched={setAppsReady} />
          {flags.showSectionsFeature && <SectionsView sections={sections} />}
          <Shortcuts shortcutsDirectories={shortcutsDirectories} />
          <Services />
        </Content>
      </Main>
      <Outlet />
    </CozyConfirmDialogProvider>
  )
}

export default Home
