import { useSettings } from 'cozy-client'

const defaultAnnouncements = {
  dismissedAt: undefined,
  seen: []
}

const useAnnouncementsSettings = (): {
  values: {
    dismissedAt?: string
    seen: string[]
  }
  save: (data: { dismissedAt?: string; seen?: string[] }) => void
} => {
  const { values, save } = useSettings('home', [
    'announcements'
  ]) as unknown as UseSettingsType

  const saveAnnouncement = (data: {
    dismissedAt?: string
    seen?: string[]
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
    values: values?.announcements ?? defaultAnnouncements,
    save: saveAnnouncement
  }
}

interface UseSettingsType {
  values?: {
    announcements: {
      dismissedAt: string
      seen: string[]
    }
  }
  save: (data: {
    announcements: {
      dismissedAt?: string
      seen: string[]
    }
  }) => void
}

export { useAnnouncementsSettings }
