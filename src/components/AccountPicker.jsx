import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import flow from 'lodash/flow'

import { KonnectorModal } from 'cozy-harvest-lib'
import { getKonnector } from 'ducks/konnectors'

import { getConnectionsByKonnector } from 'reducers'
import { withClient } from 'cozy-client/dist/hoc'
import { Overlay, Spinner } from 'cozy-ui/transpiled/react/'

class AccountPicker extends Component {
  state = {
    triggersWithStatus: []
  }
  async componentDidMount() {
    const { client, konnector } = this.props
    const triggers = await client.query(
      client
        .find('io.cozy.triggers')
        .where({
          message: {
            konnector: konnector.slug
          },
          worker: 'konnector'
        })
        .indexFields(['message.konnector', 'worker'])
        .sortBy([{ 'message.konnector': 'desc' }, { worker: 'desc' }])
    )
    const triggersWithStatus = await Promise.all(
      triggers.data.map(async trigger => {
        const triggerWithStatus = await client.query(
          client.get('io.cozy.triggers', trigger._id)
        )
        return triggerWithStatus.data
      })
    )
    this.setState({ triggersWithStatus: { data: triggersWithStatus } })
  }
  render() {
    const { connections, konnector, history } = this.props
    const { triggersWithStatus } = this.state
    const konnectorWithtriggers = { ...konnector, triggers: triggersWithStatus }
    if (!connections.length)
      return <Redirect to={`/connected/${konnector.slug}/new`} />
    if (triggersWithStatus.length === 0)
      return (
        <Overlay className="u-flex u-flex-items-center u-flex-justify-center">
          <Spinner size={'xxlarge'} />
        </Overlay>
      )
    return (
      <KonnectorModal
        konnector={konnectorWithtriggers}
        dismissAction={() => {
          history.push('/')
        }}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { konnectorSlug } = ownProps.match.params
  return {
    connections: getConnectionsByKonnector(state, konnectorSlug),
    konnector: getKonnector(state.cozy, konnectorSlug)
  }
}

export default flow(
  connect(mapStateToProps),
  withClient,
  withRouter
)(AccountPicker)
