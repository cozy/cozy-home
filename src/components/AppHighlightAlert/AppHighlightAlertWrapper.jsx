import React, { useEffect, useState } from 'react'

import { getBackupAppHighlightAlert } from 'components/AppHighlightAlert/BackupAppHighlightAlert'
import { getGeolocationTrackingAppHighlightAlert } from 'components/AppHighlightAlert/GeolocationTrackingAppHighlightAlert'

const AppHighlightAlertWrapper = ({ apps }) => {
  const [appHighlightAlerts, setAppHighlightAlerts] = useState([])

  useEffect(() => {
    const appHighlightAlerts = [
      getBackupAppHighlightAlert(),
      getGeolocationTrackingAppHighlightAlert()
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
  }, [])

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
