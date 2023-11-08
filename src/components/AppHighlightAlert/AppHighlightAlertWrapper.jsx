import React, { useEffect, useState } from 'react'

import { getBackupAppHighlightAlert } from 'components/AppHighlightAlert/BackupAppHighlightAlert'
import { getGeolocationTrackingAppHighlightAlert } from 'components/AppHighlightAlert/GeolocationTrackingAppHighlightAlert'
import { useClient } from 'cozy-client'

const AppHighlightAlertWrapper = ({ apps }) => {
  const [appHighlightAlerts, setAppHighlightAlerts] = useState([])
  const client = useClient()

  useEffect(() => {
    const getAppHighlightAlerts = async () => {
      const appHighlightAlerts = [
        getBackupAppHighlightAlert(),
        await getGeolocationTrackingAppHighlightAlert(client)
      ]

      const availableAppHighlightAlerts = appHighlightAlerts.filter(
        status => status.available
      )

      const selectedIndex = availableAppHighlightAlerts.findIndex(
        status => status.displayable
      )
      if (selectedIndex !== -1) {
        availableAppHighlightAlerts[selectedIndex].displayed = true
      }

      setAppHighlightAlerts(availableAppHighlightAlerts)
    }

    getAppHighlightAlerts()
  }, [client])

  useEffect(() => {
    appHighlightAlerts.forEach(component => {
      if (component.displayed) {
        component.onDisplayed()
      } else {
        component.onNotDisplayed()
      }
    })
  }, [appHighlightAlerts])

  return (
    <>
      {appHighlightAlerts.map(({ Component, name, displayed }) => (
        <Component key={name} apps={apps} displayed={displayed} />
      ))}
    </>
  )
}

export default AppHighlightAlertWrapper
