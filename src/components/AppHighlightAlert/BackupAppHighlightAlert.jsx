import React, { useState } from 'react'

import flag from 'cozy-flags'
import { isFlagshipApp } from 'cozy-device-helper'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import AppHighlightAlert from 'components/AppHighlightAlert/AppHighlightAlert'

const APP_START_COUNT_KEY = 'BackupAppHighlightAlert__appStartCount'

const MAX_COUNT_VALUE = 2
const DISABLED_COUNT_VALUE = -1

const isAvailable = installedApps => {
  return (
    installedApps.find(app => app.slug === 'photos') &&
    isFlagshipApp() &&
    flag('flagship.backup.enabled') &&
    flag('flagship.backup.homeHighlightEnabled')
  )
}

const isDisplayable = () => {
  const appStartCount =
    parseInt(localStorage.getItem(APP_START_COUNT_KEY), 10) || 0

  return appStartCount >= MAX_COUNT_VALUE - 1
}

export const getBackupAppHighlightAlert = installedApps => {
  return {
    name: 'BackupAppHighlightAlert',
    Component: BackupAppHighlightAlert,
    available: isAvailable(installedApps),
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

const BackupAppHighlightAlert = ({ apps, displayed }) => {
  const { t } = useI18n()
  const [
    shouldShowBackupAppHighlightAlert,
    setShouldShowBackupAppHighlightAlert
  ] = useState(displayed)

  const onClose = () => {
    setShouldShowBackupAppHighlightAlert(false)
  }

  if (!shouldShowBackupAppHighlightAlert) {
    return null
  }

  return (
    <AppHighlightAlert
      apps={apps}
      appToHighlightSlug="photos"
      onClose={onClose}
      description={t('backup.appHighlightAlert.description')}
    />
  )
}
