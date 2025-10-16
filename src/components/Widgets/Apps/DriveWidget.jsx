import React, { useState, useEffect } from 'react'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Widget from '../Atoms/Widget'
import WidgetTabs, { UnimplementedWidgetView } from '../Atoms/WidgetTabs'
import { DriveWidgetView } from './Views/DriveWidgetView'
import { useAppLinkWithStoreFallback, useClient } from 'cozy-client'

export const DriveWidget = ({ layoutControls, i }) => {
  const client = useClient()

  return (
    <Widget
      {...WidgetProps}
    >
      <DriveWidgetView app={WidgetProps.app} layoutControls={layoutControls} index={i} client={client} />
    </Widget>
  )
}

export const WidgetProps = {
  title: 'Drive',
  app: 'drive',
  headerShown: true,
  link: 'drive'
}