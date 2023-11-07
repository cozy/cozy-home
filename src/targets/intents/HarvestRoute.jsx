import React, { useEffect, useState } from 'react'
import { Routes } from 'cozy-harvest-lib'
import { useParams } from 'react-router-dom'
import CozyTheme from 'cozy-ui/transpiled/react/providers/CozyTheme'
import { useClient } from 'cozy-client'
import Intents from 'cozy-interapp'
import datacardOptions from 'cozy-harvest-lib/dist/datacards/datacardOptions'

export const HarvestRoutes = ({ intentData, intentId }) => {
  const { konnectorSlug } = useParams()
  const client = useClient()

  const intents = new Intents({ client })
  const [service, setService] = useState(null)
  useEffect(() => {
    // eslint-disable-next-line
    intents.createService().then(service => {
      setService(service)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <CozyTheme variant="normal">
      <Routes
        konnectorRoot={`/${konnectorSlug}`}
        konnectorSlug={konnectorSlug}
        onDismiss={() => (service ? service.cancel() : undefined)}
        datacardOptions={datacardOptions}
        intentData={intentData}
        intentId={intentId}
      />
    </CozyTheme>
  )
}
