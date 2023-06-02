import React from 'react'
import PropTypes from 'prop-types'

import { fetchAccounts } from 'ducks/accounts'
import { fetchKonnectors } from 'ducks/konnectors'
import { fetchTriggers } from 'ducks/triggers'
import { withClient, Q } from 'cozy-client'
class RealoadFocus extends React.Component {
  static contextTypes = {
    store: PropTypes.object
  }
  componentDidMount() {
    const dispatch = this.context.store.dispatch
    const client = this.props.client
    window.addEventListener('focus', () => {
      dispatch(fetchAccounts())
      dispatch(fetchKonnectors())
      dispatch(fetchTriggers())
      client.query(Q('io.cozy.jobs'))
      client.query(Q('io.cozy.apps'))
    })
  }

  render() {
    return null
  }
}

export default withClient(RealoadFocus)
