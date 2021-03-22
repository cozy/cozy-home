import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import flow from 'lodash/flow'

import { Routes as HarvestRoutes } from 'cozy-harvest-lib'
import datacardOptions from 'cozy-harvest-lib/dist/datacards/datacardOptions'

import { getKonnector } from 'ducks/konnectors'

import { getTriggersByKonnector } from 'reducers'

const Konnector = ({ konnector, history, triggers }) => {
  const konnectorWithTriggers = { ...konnector, triggers: { data: triggers } }
  return (
    <HarvestRoutes
      konnectorRoot={`/connected/${konnector.slug}`}
      konnector={konnectorWithTriggers}
      onDismiss={() => history.push('/connected')}
      datacardOptions={datacardOptions}
    />
  )
}

const mapStateToProps = (state, ownProps) => {
  const { konnectorSlug } = ownProps.match.params
  return {
    konnector: getKonnector(state.cozy, konnectorSlug),
    triggers: getTriggersByKonnector(state, konnectorSlug)
  }
}

export default flow(
  connect(mapStateToProps),
  withRouter
)(Konnector)
