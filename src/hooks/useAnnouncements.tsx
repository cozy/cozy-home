import { useEffect, useState } from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import flag from 'cozy-flags'
import { useClient } from 'cozy-client'

import {
  Announcement,
  AnnouncementsConfigFlag
} from 'components/Announcements/types'
import {
  getUnseenAnnouncements,
  isAnnouncement
} from 'components/Announcements/helpers'
import { useAnnouncementsSettings } from './useAnnouncementsSettings'

interface UseAnnouncementsProps {
  canBeDisplayed: boolean
}

const useAnnouncements = ({
  canBeDisplayed
}: UseAnnouncementsProps): Announcement[] => {
  const { lang } = useI18n()
  const client = useClient()

  const [fetchStatus, setFetchStatus] = useState('pending')
  const [rawData, setRawData] = useState<Announcement[] | null>(null)
  const [unseenData, setUnseenData] = useState<Announcement[]>([])
  const [hasStartedFiltering, setHasStartedFiltering] = useState(false)
  const config = flag<AnnouncementsConfigFlag>('home.announcements')
  const { values, save } = useAnnouncementsSettings()

  useEffect(() => {
    const fetchAnnouncements = async (): Promise<void> => {
      setFetchStatus('loading')
      try {
        const resp = (await client?.stackClient.fetchJSON(
          'GET',
          `/remote/${config?.remoteDoctype}?lang=${lang}&channels=${config?.channels}`
        )) as { data: unknown[] }

        if (
          !Array.isArray(resp.data) ||
          !resp.data.every(announcement => isAnnouncement(announcement))
        ) {
          throw new Error('Invalid data')
        }

        setRawData(resp.data)
        setFetchStatus('loaded')
      } catch (error) {
        setFetchStatus('error')
      }
    }

    if (
      fetchStatus === 'pending' &&
      canBeDisplayed &&
      config?.remoteDoctype &&
      config?.channels
    ) {
      void fetchAnnouncements()
    }
  }, [client?.stackClient, config, fetchStatus, lang, values, canBeDisplayed])

  useEffect(() => {
    if (rawData !== null && values && !hasStartedFiltering) {
      setHasStartedFiltering(true)
      const uuidsSeen = values.seen ?? []
      const uuidsFromApi = rawData.map(({ attributes }) => attributes.uuid)

      // we only keep the announcements seen that are still returned by the API
      // to limit the size of the seen array
      const uuidsInCommon = uuidsSeen.filter(uuid =>
        uuidsFromApi.includes(uuid)
      )
      const unseenData = getUnseenAnnouncements(rawData, uuidsInCommon)

      save({ seen: uuidsInCommon })

      setUnseenData(unseenData.slice(0, 5))
    }
  }, [hasStartedFiltering, rawData, values, save])

  return unseenData
}

export { useAnnouncements }
