import React from 'react'
import { createStore } from 'redux'
import { Provider as ReduxProvider } from 'react-redux'
import PropTypes from 'prop-types'

import { CozyProvider } from 'cozy-client'
import { createMockClient } from 'cozy-client/dist/mock'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/providers/Breakpoints'
import CozyTheme from 'cozy-ui/transpiled/react/providers/CozyTheme'
import I18n from 'cozy-ui/transpiled/react/providers/I18n'
import AlertProvider from 'cozy-ui/transpiled/react/providers/Alert'
import { SharingContext } from 'cozy-sharing'

import { BackupDataProvider } from '@/components/BackupNotification/useBackupData'

import enLocale from '../src/locales/en.json'

const fakeDefaultReduxState = {
  apps: [{ slug: 'drive', links: { related: '' } }],
  konnectors: {}
}
const reduxStore = createStore(() => fakeDefaultReduxState)

const defaultClient = createMockClient({
  clientOptions: { uri: 'https://claude.mycozy.cloud' }
})
defaultClient.ensureStore()

const mockSharingContextValue = {
  refresh: jest.fn(),
  hasWriteAccess: jest.fn(),
  getRecipients: jest.fn().mockReturnValue([]),
  getDocumentPermissions: jest.fn(),
  isOwner: jest.fn(),
  allLoaded: jest.fn(),
  hasSharedParent: jest.fn(),
  getSharingLink: jest.fn()
}

class AppLike extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  getChildContext() {
    return {
      store: this.props.store
    }
  }

  render() {
    return (
      <BreakpointsProvider>
        <CozyProvider client={this.props.client || defaultClient}>
          <SharingContext.Provider value={mockSharingContextValue}>
            <CozyTheme>
              <AlertProvider>
                <ReduxProvider store={this.props.store || defaultClient.store}>
                  <I18n dictRequire={() => enLocale} lang="en">
                    <BackupDataProvider>
                      {this.props.children}
                    </BackupDataProvider>
                  </I18n>
                </ReduxProvider>
              </AlertProvider>
            </CozyTheme>
          </SharingContext.Provider>
        </CozyProvider>
      </BreakpointsProvider>
    )
  }
}

AppLike.childContextTypes = {
  store: PropTypes.object.isRequired
}

AppLike.defaultProps = {
  store: reduxStore
}

export default AppLike
