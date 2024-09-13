import React, { FC, useEffect, useState } from 'react'
import { differenceInHours } from 'date-fns'

import flag from 'cozy-flags'

import { AnnouncementsDialog } from './AnnouncementsDialog'
import { useAnnouncements } from 'hooks/useAnnouncements'
import { AnnouncementsConfigFlag } from './types'
import { useAnnouncementsSettings } from 'hooks/useAnnouncementsSettings'

const Announcements: FC = () => {
  const config = flag<AnnouncementsConfigFlag>('home.announcements')
  const [hasBeenDismissed, setBeenDismissed] = useState(false)
  const { fetchStatus, values, save } = useAnnouncementsSettings()
  const [hasBeenActivated, setBeenActivated] = useState(false)

  useEffect(() => {
    if (
      !values.firstActivatedAt &&
      !hasBeenActivated &&
      fetchStatus === 'loaded'
    ) {
      save({
        firstActivatedAt: new Date().toISOString()
      })
      setBeenActivated(true)
    }
  }, [hasBeenActivated, save, values.firstActivatedAt, fetchStatus])

  const handleDismiss = (): void => {
    setBeenDismissed(true)
  }

  const hasBeenActivatedForMoreThanAHour = values.firstActivatedAt
    ? differenceInHours(new Date(), Date.parse(values.firstActivatedAt)) >= 1
    : false
  const moreThan = config?.delayAfterDismiss ?? 24
  const hasBeenDismissedForMoreThan = values.dismissedAt
    ? differenceInHours(new Date(), Date.parse(values.dismissedAt)) >= moreThan
    : true
  const canBeDisplayed =
    !hasBeenDismissed &&
    hasBeenDismissedForMoreThan &&
    hasBeenActivatedForMoreThanAHour
  const announcements = useAnnouncements({
    canBeDisplayed
  })

  if (canBeDisplayed && announcements.length > 0) {
    return (
      <AnnouncementsDialog
        announcements={announcements}
        onDismiss={handleDismiss}
      />
    )
  }

  return null
}

export { Announcements }
