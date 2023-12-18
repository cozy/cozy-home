import React, { useEffect, useState } from 'react'

import { getAvailableAppHighlightAlerts } from 'components/AppHighlightAlert/helpers'
import { useClient } from 'cozy-client'

const AppHighlightAlertWrapper = ({ apps }) => {
  const [appHighlightAlerts, setAppHighlightAlerts] = useState([])
  const client = useClient()

  useEffect(() => {
    const getAppHighlightAlerts = async () => {
      const availableAppHighlightAlerts = await getAvailableAppHighlightAlerts(
        client
      )

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
