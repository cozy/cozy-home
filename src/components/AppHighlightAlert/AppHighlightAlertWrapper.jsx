import React, { useEffect, useState } from 'react'

import { getAvailableAppHighlightAlerts } from '@/components/AppHighlightAlert/helpers'
import { useClient } from 'cozy-client'
import log from 'cozy-logger'

const AppHighlightAlertWrapper = ({ apps }) => {
  const [appHighlightAlerts, setAppHighlightAlerts] = useState([])
  const [isAppHighlightAlertsError, setIsAppHighlightAlertsError] =
    useState(false)
  const client = useClient()

  useEffect(() => {
    const getAppHighlightAlerts = async () => {
      try {
        const availableAppHighlightAlerts =
          await getAvailableAppHighlightAlerts(client, apps)

        setAppHighlightAlerts(availableAppHighlightAlerts)
      } catch (error) {
        log('error', `App highlight error: ${error}`)
        setIsAppHighlightAlertsError(true)
      }
    }

    if (apps && !isAppHighlightAlertsError && appHighlightAlerts.length === 0) {
      getAppHighlightAlerts()
    }
  }, [client, apps, isAppHighlightAlertsError, appHighlightAlerts.length])

  if (appHighlightAlerts && appHighlightAlerts?.length > 0) {
    appHighlightAlerts.forEach(component => {
      if (component) {
        component.displayed
          ? component.onDisplayed()
          : component.onNotDisplayed()
      }
    })
  }

  useEffect(() => {
    if (appHighlightAlerts && appHighlightAlerts?.length > 0) {
      appHighlightAlerts.forEach(component => {
        if (component) {
          component.displayed
            ? component.onDisplayed()
            : component.onNotDisplayed()
        }
      })
    }
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
