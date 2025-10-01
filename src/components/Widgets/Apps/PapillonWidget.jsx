import React from 'react'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { Widget } from '../WidgetsWrapper'
import { PapillonWidgetView } from '../Views/PapillonWidgetView'
import { useAppLinkWithStoreFallback, useClient } from 'cozy-client'

export const PapillonWidget = () => {
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const date = new Date().toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  const client = useClient()

  return (
    <Widget
      title="Papillon"
      icon="cube"
      headerShown={false}
      link={useAppLinkWithStoreFallback('papillon', client, '/').url}
    >
      <PapillonWidgetView />
    </Widget>
  )
}