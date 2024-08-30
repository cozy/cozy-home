import { Announcement } from './types'

export const getUnseenAnnouncements = (
  data: Announcement[],
  announcements_seen: string[]
): Announcement[] => {
  return data.filter(announcement => {
    if (announcements_seen) {
      return !announcements_seen.includes(announcement.attributes.uuid)
    }
    return true
  })
}

export const isAnnouncement = (
  announcement: unknown
): announcement is Announcement => {
  return (announcement as Announcement).attributes?.title !== undefined
}
