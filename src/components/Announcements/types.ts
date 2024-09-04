export interface Announcement {
  id: string
  type: string
  attributes: {
    title: string
    content: string
    start_at: string
    uuid: string
    main_action?: {
      label: string
      link: string
    }
    primary_image: {
      data: {
        attributes: {
          formats: {
            small?: {
              url: string
            }
          }
          alternativeText?: string
          url: string
        }
      }
    }
    secondary_image: {
      data: {
        attributes: {
          formats: {
            thumbnail: {
              url: string
            }
          }
          alternativeText?: string
        }
      } | null
    }
  }
}

export interface AnnouncementsConfig {
  remoteDoctype: string
  channels: string
  delayAfterDismiss: number
}

export type AnnouncementsConfigFlag = AnnouncementsConfig | null
