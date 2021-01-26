import React from 'react'
import { createStore } from 'redux'
import { Provider as ReduxProvider } from 'react-redux'
import PropTypes from 'prop-types'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import I18n from 'cozy-ui/transpiled/react/I18n'
import enLocale from '../src/locales/en.json'

const fakeDefaultReduxState = {
  apps: [{ slug: 'drive', links: { related: '' } }]
}
const reduxStore = createStore(() => fakeDefaultReduxState)

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
        <ReduxProvider store={this.props.store}>
          <I18n dictRequire={() => enLocale} lang="en">
            {this.props.children}
          </I18n>
        </ReduxProvider>
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
