import React from 'react'
import { createStore } from 'redux'
import { CozyProvider } from 'cozy-client'
import { createMockClient } from 'cozy-client/dist/mock'
import { Provider as ReduxProvider } from 'react-redux'
import PropTypes from 'prop-types'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/providers/Breakpoints'
import CozyTheme from 'cozy-ui/transpiled/react/providers/CozyTheme'
import I18n from 'cozy-ui/transpiled/react/providers/I18n'
import { BackupDataProvider } from 'components/BackupNotification/useBackupData'
import AlertProvider from 'cozy-ui/transpiled/react/providers/Alert'
import enLocale from '../src/locales/en.json'

const fakeDefaultReduxState = {
  apps: [{ slug: 'drive', links: { related: '' } }],
  konnectors: {}
}
const reduxStore = createStore(() => fakeDefaultReduxState)

const defaultClient = createMockClient({})
defaultClient.ensureStore()

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
          <CozyTheme>
            <AlertProvider>
              <ReduxProvider store={this.props.store || defaultClient.store}>
                <I18n dictRequire={() => enLocale} lang="en">
                  <BackupDataProvider>{this.props.children}</BackupDataProvider>
                </I18n>
              </ReduxProvider>
            </AlertProvider>
          </CozyTheme>
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
