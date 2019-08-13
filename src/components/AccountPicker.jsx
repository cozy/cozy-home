import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import flow from 'lodash/flow'

import { KonnectorModal } from 'cozy-harvest-lib'
import { getKonnector } from 'ducks/konnectors'

import { getConnectionsByKonnector, getTriggersByKonnector } from 'reducers'
import { withClient } from 'cozy-client/dist/hoc'

class AccountPicker extends Component {
  render() {
    const { connections, konnector, history, match, triggers } = this.props
    const konnectorWithtriggers = { ...konnector, triggers: triggers }
    const selectedAccountId = match.params.accountId

    if (!connections.length)
      return <Redirect to={`/connected/${konnector.slug}/new`} />

    return (
      <KonnectorModal
        konnector={konnectorWithtriggers}
        accountId={selectedAccountId}
        dismissAction={() => {
          history.push('/connected')
        }}
        createAction={() => {
          history.push(`/connected/${konnector.slug}/new`)
        }}
        onAccountChange={account => {
          history.push(`/connected/${konnector.slug}/accounts/${account._id}`)
        }}
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
)(AccountPicker)
