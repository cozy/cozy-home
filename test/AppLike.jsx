import PropTypes from 'prop-types'
import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { createStore } from 'redux'

import { CozyProvider } from 'cozy-client'
import { createMockClient } from 'cozy-client/dist/mock'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/providers/Breakpoints'
import I18n from 'cozy-ui/transpiled/react/providers/I18n'

import { BackupDataProvider } from 'components/BackupNotification/useBackupData'
import enLocale from 'locales/en.json'

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
          <ReduxProvider store={this.props.store || defaultClient.store}>
            <I18n dictRequire={() => enLocale} lang="en">
              <BackupDataProvider>{this.props.children}</BackupDataProvider>
            </I18n>
          </ReduxProvider>
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
