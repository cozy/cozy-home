import React from 'react'
import PropTypes from 'prop-types'
import {
  makeTriggersWithJobStatusQuery,
  makeAppsQuery,
  makeJobsQuery
} from 'queries'
import { withClient } from 'cozy-client'
class RealoadFocus extends React.Component {
  static contextTypes = {
    store: PropTypes.object
  }
  componentDidMount() {
    const client = this.props.client
    window.addEventListener('focus', () => {
      client.query(makeJobsQuery.definition(), makeJobsQuery.options)
      client.query(
        makeTriggersWithJobStatusQuery.definition(),
        makeTriggersWithJobStatusQuery.options
      )
      client.query(makeAppsQuery.definition(), makeAppsQuery.options)
    })
  }

  render() {
    return null
  }
}

export default withClient(RealoadFocus)
