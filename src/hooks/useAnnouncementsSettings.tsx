import { useSettings } from 'cozy-client'

const defaultAnnouncements = {
  dismissedAt: undefined,
  seen: [],
  firstActivatedAt: undefined
}

const useAnnouncementsSettings = (): {
  fetchStatus: string
  values: {
    dismissedAt?: string
    seen: string[]
    firstActivatedAt?: string
  }
  save: (data: {
    dismissedAt?: string
    seen?: string[]
    firstActivatedAt?: string
  }) => void
} => {
  const { query, values, save } = useSettings('home', [
    'announcements'
  ]) as unknown as UseSettingsType

  const saveAnnouncement = (data: {
    dismissedAt?: string
    seen?: string[]
    firstActivatedAt?: string
  }): void => {
    const announcements = {
      ...(values?.announcements ?? defaultAnnouncements),
      ...data
    }
    save({
      announcements
    })
  }

  return {
    fetchStatus: query.fetchStatus,
    values: values?.announcements ?? defaultAnnouncements,
    save: saveAnnouncement
  }
}

interface UseSettingsType {
  query: {
    fetchStatus: string
  }
  values?: {
    announcements: {
      dismissedAt: string
      seen: string[]
      firstActivatedAt: string
    }
  }
  save: (data: {
    announcements: {
      dismissedAt?: string
      seen: string[]
      firstActivatedAt?: string
    }
  }) => void
}

export { useAnnouncementsSettings }
