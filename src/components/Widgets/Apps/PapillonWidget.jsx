import React from 'react'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Widget from '../Atoms/Widget'
import { PapillonWidgetView } from './Views/PapillonWidgetView'
import { useAppLinkWithStoreFallback, useClient } from 'cozy-client'

export const PapillonWidget = () => {
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const date = new Date().toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  const client = useClient()

  return (
    <Widget
      {...WidgetProps}
    >
      <PapillonWidgetView />
    </Widget>
  )
}

export const WidgetProps = {
  title: 'Papillon',
  app: 'papillon',
  headerShown: true,
  link: (client) => useAppLinkWithStoreFallback('papillon', client, '/').url
}