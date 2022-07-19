import React, { useCallback, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import flow from 'lodash/flow'

import { Routes as HarvestRoutes } from 'cozy-harvest-lib'
import datacardOptions from 'cozy-harvest-lib/dist/datacards/datacardOptions'
import log from 'cozy-logger'

import { getKonnector } from 'ducks/konnectors'

import { getTriggersByKonnector } from 'reducers'
import { closeApp, openApp } from 'hooks/useOpenApp'

export const Konnector = ({ konnector, history, match, triggers }) => {
  const { konnectorSlug } = match ? match.params : {}
  const konnectorWithTriggers = konnector
    ? { ...konnector, triggers: { data: triggers } }
    : undefined
  const onDismiss = useCallback(() => history.push('/connected'), [history])
  const slug = konnector?.slug || location.hash.split('/')[2]

  useEffect(() => {
    openApp()

    return closeApp
  }, [])

  if (!slug) {
    log(
      'error',
      `<Konnector /> failed to render. No Konnector slug was provided to the component props.
      Tried to recover with window location but couldn't find a slug.
      Hypertext Reference is "${location.href}".`
    )

    return null
  }

  return (
    <HarvestRoutes
      konnectorRoot={`/connected/${slug}`}
      konnector={konnectorWithTriggers}
      konnectorSlug={konnectorSlug}
      onDismiss={onDismiss}
      datacardOptions={datacardOptions}
    />
  )
}

const mapStateToProps = (state, ownProps) => {
  const { konnectorSlug } = ownProps.match.params
  return {
    konnector: getKonnector(state.oldcozy, konnectorSlug),
    triggers: getTriggersByKonnector(state, konnectorSlug)
  }
}

export default flow(connect(mapStateToProps), withRouter)(Konnector)
