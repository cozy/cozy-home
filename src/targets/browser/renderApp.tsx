import React from 'react'
import { Root } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import 'url-search-params-polyfill'

import { handleOAuthResponse } from 'cozy-harvest-lib'
import { WebviewIntentProvider } from 'cozy-intent'
import 'cozy-ui/dist/cozy-ui.utils.min.css'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/providers/Breakpoints'
import 'cozy-ui/transpiled/react/stylesheet.css'

import AppWrapper from 'components/AppWrapper'
import {
  BackupDataProvider,
  useBackupData,
  BackupInfo
} from 'components/BackupNotification/useBackupData'
import { closeApp, openApp } from 'hooks/useOpenApp'
import 'styles/index.styl'

export const renderApp = (root?: Root): void => {
  if (handleOAuthResponse()) {
    root?.render(<Spinner size="xxlarge" middle={true} />)
    return
  }

  root?.render(
    <BackupDataProvider>
      <App />
    </BackupDataProvider>
  )
}

const App = (): JSX.Element => {
  // eslint-disable-next-line
  const AnimatedWrapper = require('components/AnimatedWrapper').default as () => JSX.Element

  const { setBackupInfo } = useBackupData()

  return (
    <WebviewIntentProvider
      methods={{
        openApp,
        closeApp,
        // @ts-expect-error Will need to add type to cozy-intent at the end of backup feature
        updateBackupInfo: (backupInfo: BackupInfo): void => {
          setBackupInfo(backupInfo)
        }
      }}
    >
      <AppWrapper>
        <BreakpointsProvider>
          <HashRouter>
            <AnimatedWrapper />
          </HashRouter>
        </BreakpointsProvider>
      </AppWrapper>
    </WebviewIntentProvider>
  )
}
