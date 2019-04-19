import React from 'react'
import PropTypes from 'prop-types'

class AppLike extends React.Component {
  getChildContext() {
    return {
      t: this.props.t,
      store: this.props.store
    }
  }

  render() {
    return this.props.children
  }
}

AppLike.childContextTypes = {
  t: PropTypes.func.isRequired,
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
  store: fakeStore,
  t: x => x
}

export default AppLike
