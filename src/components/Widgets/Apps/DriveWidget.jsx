import React, { useState, useEffect } from 'react'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Widget from '../Atoms/Widget'
import WidgetTabs, { UnimplementedWidgetView } from '../Atoms/WidgetTabs'
import { DriveWidgetView } from './Views/DriveWidgetView'
import { useAppLinkWithStoreFallback, useClient } from 'cozy-client'

export const DriveWidget = () => {
  const client = useClient()

  return (
    <Widget
      title="Drive"
      app="drive"
      headerShown={true}
      link={useAppLinkWithStoreFallback('drive', client, '/').url}
    >
      <DriveWidgetView />
    </Widget>
  )
}