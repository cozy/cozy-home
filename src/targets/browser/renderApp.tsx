import 'cozy-ui/transpiled/react/stylesheet.css'
import 'cozy-ui/dist/cozy-ui.utils.min.css'
import 'styles/index.styl'
import 'url-search-params-polyfill'

import React from 'react'
import { HashRouter } from 'react-router-dom'

import { handleOAuthResponse } from 'cozy-harvest-lib'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import { WebviewIntentProvider } from 'cozy-intent'

import AppWrapper from 'components/AppWrapper'
import { closeApp, openApp } from 'hooks/useOpenApp'
import { Root } from 'react-dom/client'

import {
  BackupDataProvider,
  useBackupData,
  BackupInfo
} from 'components/BackupNotification/useBackupData'

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
        <HashRouter>
          <AnimatedWrapper />
        </HashRouter>
      </AppWrapper>
    </WebviewIntentProvider>
  )
}
