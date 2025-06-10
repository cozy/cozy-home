import React from 'react'
import PropTypes from 'prop-types'
import {
  makeTriggersWithJobStatusQuery,
  makeAppsQuery,
  makeJobsQuery
} from '@/queries'
import { withClient } from 'cozy-client'
class RealoadFocus extends React.Component {
  static contextTypes = {
    store: PropTypes.object
  }
  componentDidMount() {
    const client = this.props.client
    window.addEventListener('focus', () => {
      // FIXME: do not use query options here, because of https://github.com/cozy/cozy-client/issues/931
      // Especially for the apps query, the fetchPolicy is always applied here, because it is called
      // elsewhere, making the query's lastUpdate very close in time.
      // And because of this, the home is rendered after each focus, as the same query gives different
      // result (a complete response, vs an early empty return in this case)
      client.query(makeJobsQuery.definition())
      client.query(makeTriggersWithJobStatusQuery.definition())
      client.query(makeAppsQuery.definition())
    })
  }

  render() {
    return null
  }
}

export default withClient(RealoadFocus)
