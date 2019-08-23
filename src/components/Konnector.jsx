import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import flow from 'lodash/flow'

import { Routes as HarvestRoutes } from 'cozy-harvest-lib'
import { getKonnector } from 'ducks/konnectors'

import { getConnectionsByKonnector, getTriggersByKonnector } from 'reducers'
import { withClient } from 'cozy-client/dist/hoc'

class Konnector extends Component {
  render() {
    const { connections, konnector, history, match, triggers } = this.props
    const konnectorWithtriggers = { ...konnector, triggers: triggers }
    const selectedAccountId = match.params.accountId

    if (!connections.length)
      return <Redirect to={`/connected/${konnector.slug}/new`} />

    return (
      <HarvestRoutes
        konnectorRoot="/connected/:konnectorSlug"
        konnector={konnectorWithtriggers}
        onDismiss={() => history.push('/connected')}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { konnectorSlug } = ownProps.match.params
  return {
    connections: getConnectionsByKonnector(state, konnectorSlug),
    konnector: getKonnector(state.cozy, konnectorSlug),
    triggers: getTriggersByKonnector(state, konnectorSlug)
  }
}

export default flow(
  connect(mapStateToProps),
  withClient,
  withRouter
)(Konnector)
