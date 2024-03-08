import React from 'react'
import PropTypes from 'prop-types'

import { withClient, Q } from 'cozy-client'
class RealoadFocus extends React.Component {
  static contextTypes = {
    store: PropTypes.object
  }
  componentDidMount() {
    const client = this.props.client
    window.addEventListener('focus', () => {
      client.query(Q('io.cozy.jobs'))
      client.query(
        Q('io.cozy.triggers').where({
          worker: { $in: ['client', 'konnector'] }
        })
      )
      client.query(Q('io.cozy.apps'))
    })
  }

  render() {
    return null
  }
}

export default withClient(RealoadFocus)
