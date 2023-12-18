import React, { useState } from 'react'

import flag from 'cozy-flags'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import AppHighlightAlert from 'components/AppHighlightAlert/AppHighlightAlert'
import { buildExistingTimeseriesGeojsonQuery } from 'queries'

const APP_START_COUNT_KEY =
  'GeolocationTrackingAppHighlightAlert__appStartCount'

const DISABLED_COUNT_VALUE = -1

const hasNoTimeseriesGeojson = async client => {
  const existingTimeseriesGeojsonQuery = buildExistingTimeseriesGeojsonQuery()
  const { data: timeseries } = await client.fetchQueryAndGetFromState(
    existingTimeseriesGeojsonQuery
  )

  return timeseries.length === 0
}

const isAvailable = async (client, installedApps) => {
  const bikegoalSettings = flag('coachco2.bikegoal.settings')

  return (
    installedApps.find(app => app.slug === 'coachco2') &&
    flag('home.push.coachco2.opencount') &&
    flag('home.push.coachco2.opencount') >= 0 &&
    (!bikegoalSettings ||
      bikegoalSettings.sourceOffer === null ||
      (bikegoalSettings.sourceOffer !== null &&
        flag('coachco2.bikegoal.enabled'))) &&
    (await hasNoTimeseriesGeojson(client))
  )
}

const isDisplayable = () => {
  const appStartCount =
    parseInt(localStorage.getItem(APP_START_COUNT_KEY), 10) || 0

  return appStartCount >= flag('home.push.coachco2.opencount') - 1
}

export const getGeolocationTrackingAppHighlightAlert = async (
  client,
  installedApps
) => {
  return {
    name: 'GeolocationTrackingAppHighlightAlert',
    Component: GeolocationTrackingAppHighlightAlert,
    available: await isAvailable(client, installedApps),
    displayable: isDisplayable(),
    onNotDisplayed: onNotDisplayed,
    onDisplayed: onDisplayed
  }
}

const onNotDisplayed = () => {
  const appStartCount = parseInt(localStorage.getItem(APP_START_COUNT_KEY), 10)

  let newAppStartCount

  if (appStartCount === DISABLED_COUNT_VALUE) {
    return
  }

  if (isNaN(appStartCount)) {
    newAppStartCount = 1
  } else {
    newAppStartCount = appStartCount + 1
  }

  localStorage.setItem(APP_START_COUNT_KEY, newAppStartCount.toString())
}

const onDisplayed = () => {
  localStorage.setItem(APP_START_COUNT_KEY, DISABLED_COUNT_VALUE)
}

const getAlertDescription = t => {
  const bikegoalSettings = flag('coachco2.bikegoal.settings')

  if (bikegoalSettings?.sourceOffer) {
    if (bikegoalSettings.sourceOffer === 'employer') {
      return t(
        'appHighlightAlert.geolocationTracking.bikegoalSourceEmployerDescription',
        {
          sourceType: bikegoalSettings.sourceType,
          sourceName: bikegoalSettings.sourceName
        }
      )
    } else {
      return t(
        'appHighlightAlert.geolocationTracking.bikegoalSourceDefaultDescription',
        {
          sourceType: bikegoalSettings.sourceType,
          sourceName: bikegoalSettings.sourceName
        }
      )
    }
  }

  return t('appHighlightAlert.geolocationTracking.defaultDescription')
}

export const GeolocationTrackingAppHighlightAlert = ({ apps, displayed }) => {
  const { t } = useI18n()
  const [
    shouldShowGeolocationTrackingAppHighlightAlert,
    setShouldShowGeolocationTrackingAppHighlightAlert
  ] = useState(displayed)

  const onClose = () => {
    setShouldShowGeolocationTrackingAppHighlightAlert(false)
  }

  if (!shouldShowGeolocationTrackingAppHighlightAlert) {
    return null
  }

  const description = getAlertDescription(t)

  return (
    <AppHighlightAlert
      apps={apps}
      appToHighlightSlug="coachco2"
      onClose={onClose}
      description={description}
    />
  )
}
