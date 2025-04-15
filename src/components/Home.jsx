import React from 'react'
import cx from 'classnames'
import { Outlet, useLocation } from 'react-router-dom'

import flag from 'cozy-flags'
import { CozyConfirmDialogProvider } from 'cozy-harvest-lib'
import { getFlagshipMetadata } from 'cozy-device-helper'
import { Main, Content } from 'cozy-ui/transpiled/react/Layout'
import { useBreakpoints } from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { AssistantDesktopWrapper } from 'components/Assistant/AssistantDesktopWrapper'

import ApplicationsAndServices from 'components/ApplicationsAndServices'
import Applications from 'components/Applications'
import ScrollToTopOnMount from 'components/ScrollToTopOnMount'
import Services from 'components/Services'
import Shortcuts from 'components/Shortcuts'
import GroupedServices from 'components/GroupedServices'
import { Announcements } from 'components/Announcements/Announcements'

import styles from './styles.styl'

const Home = ({ wrapper }) => {
  const { pathname } = useLocation()
  const { isMobile } = useBreakpoints()

  return (
    <CozyConfirmDialogProvider>
      <Main className="u-flex-grow-1">
        <ScrollToTopOnMount target={wrapper} />
        {pathname === '/connected' && <Announcements />}
        {flag('cozy.searchbar.enabled') && !isMobile && (
          <AssistantDesktopWrapper />
        )}
        <Content
          className={cx('u-flex u-flex-column u-ph-1', {
            [styles['homeMainContent--withAssistant']]:
              isMobile && flag('cozy.searchbar.enabled'),
            [styles['homeMainContent--immersive']]:
              getFlagshipMetadata().immersive
          })}
        >
          {flag('home.apps.only-one-list') ? (
            <ApplicationsAndServices />
          ) : (
            <>
              <Applications />
              <Shortcuts />
              {flag('home.detailed-services-dev') ? (
                <GroupedServices />
              ) : (
                <Services />
              )}
            </>
          )}
        </Content>
      </Main>
      <Outlet />
    </CozyConfirmDialogProvider>
  )
}

export default Home
