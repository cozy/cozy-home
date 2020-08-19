import React from 'react'
import { createStore } from 'redux'
import { Provider as ReduxProvider } from 'react-redux'
import PropTypes from 'prop-types'
import I18n from 'cozy-ui/react/I18n'

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
    const polyglot = {
      t: s => s
    }
    return (
      <ReduxProvider store={this.props.store}>
        <I18n dictRequire={() => ({})} polyglot={polyglot} lang="en">
          {this.props.children}
        </I18n>
      </ReduxProvider>
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
