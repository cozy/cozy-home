import React from 'react'
import PropTypes from 'prop-types'
import I18n from 'cozy-ui/react/I18n'

class AppLike extends React.Component {
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
      <I18n dictRequire={() => ({})} polyglot={polyglot} lang="en">
        {this.props.children}
      </I18n>
    )
  }
}

AppLike.childContextTypes = {
  store: PropTypes.object.isRequired
}

const fakeStore = {
  banksUrl: 'https://banks',
  subscribe: x => x,
  dispatch: x => x,
  getState: () => ({
    apps: [{ slug: 'drive', links: { related: '' } }]
  })
}

AppLike.defaultProps = {
  store: fakeStore
}

export default AppLike
