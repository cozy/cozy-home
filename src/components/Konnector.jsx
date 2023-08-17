import React, { useCallback, useEffect } from 'react'
import { connect } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import datacardOptions from 'cozy-harvest-lib/dist/datacards/datacardOptions'
import log from 'cozy-logger'
import { Routes as HarvestRoutes } from 'cozy-harvest-lib'

import { closeApp, openApp } from 'hooks/useOpenApp'
import { getKonnector } from 'ducks/konnectors'
import { getTriggersByKonnector } from 'reducers'
import CozyTheme from 'cozy-ui/transpiled/react/providers/CozyTheme'

export const StatelessKonnector = ({ konnector, triggers, slug }) => {
  const navigate = useNavigate()
  const konnectorWithTriggers = konnector
    ? { ...konnector, triggers: { data: triggers } }
    : undefined
  const onDismiss = useCallback(() => navigate('/connected'), [navigate])
  const konnectorSlug = slug || konnector?.slug || location.hash.split('/')[2]
  const location = useLocation()

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
    <CozyTheme variant="normal">
      <HarvestRoutes
        datacardOptions={datacardOptions}
        konnector={konnectorWithTriggers}
        konnectorRoot={`/connected/${konnectorSlug}`}
        konnectorSlug={konnectorSlug}
        onDismiss={onDismiss}
      />
    </CozyTheme>
  )
}

const StatefulKonnector = connect((state, { slug }) => ({
  konnector: getKonnector(state.cozy, slug),
  triggers: getTriggersByKonnector(state, slug)
}))(StatelessKonnector)

export const Konnector = () => {
  const { konnectorSlug } = useParams()

  return <StatefulKonnector slug={konnectorSlug} />
}

export default Konnector
