import React from 'react'
import { Routes } from 'cozy-harvest-lib'
import { useParams } from 'react-router-dom'
import CozyTheme from 'cozy-ui/transpiled/react/CozyTheme'

export const HarvestRoutes = props => {
  const { konnectorSlug } = useParams()

  return (
    <CozyTheme variant="normal">
      <Routes
        konnectorRoot={`/${konnectorSlug}`}
        konnectorSlug={konnectorSlug}
      />
    </CozyTheme>
  )
}
