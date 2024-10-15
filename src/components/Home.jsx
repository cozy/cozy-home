import React from 'react'
import cx from 'classnames'
import { Outlet, useLocation } from 'react-router-dom'

import flag from 'cozy-flags'
import CozyDevTools from 'cozy-client/dist/devtools'
import { CozyConfirmDialogProvider } from 'cozy-harvest-lib'
import { getFlagshipMetadata } from 'cozy-device-helper'
import { Main, Content } from 'cozy-ui/transpiled/react/Layout'
import { useBreakpoints } from 'cozy-ui/transpiled/react/providers/Breakpoints'

import AssistantWrapperMobile from 'assistant/AssistantWrapperMobile'
import AssistantWrapperDesktop from 'assistant/AssistantWrapperDesktop'
import Applications from 'components/Applications'
import ScrollToTopOnMount from 'components/ScrollToTopOnMount'
import Services from 'components/Services'
import Shortcuts from 'components/Shortcuts'
import GroupedServices from 'components/GroupedServices'
import { Announcements } from 'components/Announcements/Announcements'

import styles from './styles.styl'

const Home = ({ setAppsReady, wrapper }) => {
  const { pathname } = useLocation()
  const { isMobile } = useBreakpoints()

  return (
    <CozyConfirmDialogProvider>
      <Main className="u-flex-grow-1">
        <ScrollToTopOnMount target={wrapper} />
        {pathname === '/connected' && <Announcements />}
        <AssistantWrapperDesktop />
        <AssistantWrapperMobile />
        <Content
          className={cx('u-flex u-flex-column u-ph-1', {
            [styles['homeMainContent--withAssistant']]:
              isMobile && flag('cozy.assistant.enabled'),
            [styles['homeMainContent--immersive']]:
              getFlagshipMetadata().immersive
          })}
        >
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
