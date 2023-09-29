import React, { useEffect, useState } from 'react'

import flag from 'cozy-flags'
import { isFlagshipApp } from 'cozy-device-helper'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import AppHighlightAlert from 'components/AppHighlightAlert/AppHighlightAlert'

const APP_START_COUNT_KEY = 'BackupAppHighlightAlert__appStartCount'

const MAX_COUNT_VALUE = 2
const DISABLED_COUNT_VALUE = -1

const useBackupAppHighlightAlert = () => {
  const [
    shouldShowBackupAppHighlightAlert,
    setShouldShowBackupAppHighlightAlert
  ] = useState(false)

  useEffect(() => {
    if (
      !isFlagshipApp() ||
      !flag('flagship.backup.enabled') ||
      !flag('flagship.backup.homeHighlightEnabled')
    ) {
      return
    }

    const appStartCount = parseInt(
      localStorage.getItem(APP_START_COUNT_KEY),
      10
    )

    let newAppStartCount

    if (isNaN(appStartCount)) {
      newAppStartCount = 1
    } else if (appStartCount === DISABLED_COUNT_VALUE) {
      return
    } else if (appStartCount < MAX_COUNT_VALUE) {
      newAppStartCount = appStartCount + 1
    } else {
      newAppStartCount = DISABLED_COUNT_VALUE
    }

    localStorage.setItem(APP_START_COUNT_KEY, newAppStartCount.toString())

    setShouldShowBackupAppHighlightAlert(newAppStartCount === 2)
  }, [])

  return [
    shouldShowBackupAppHighlightAlert,
    setShouldShowBackupAppHighlightAlert
  ]
}

const BackupAppHighlightAlert = ({ apps }) => {
  const { t } = useI18n()
  const [
    shouldShowBackupAppHighlightAlert,
    setShouldShowBackupAppHighlightAlert
  ] = useBackupAppHighlightAlert()

  const onClose = () => {
    setShouldShowBackupAppHighlightAlert(false)
  }

  if (!shouldShowBackupAppHighlightAlert) {
    return null
  }

  return (
    <AppHighlightAlert
      key="BackupAppHighlightAlert"
      apps={apps}
      appToHighlightSlug="photos"
      onClose={onClose}
      description={t('backup.appHighlightAlert.description')}
    />
  )
}

export default BackupAppHighlightAlert
