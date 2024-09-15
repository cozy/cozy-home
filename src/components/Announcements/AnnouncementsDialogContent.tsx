import React, { FC } from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Buttons from 'cozy-ui/transpiled/react/Buttons'
import Markdown from 'cozy-ui/transpiled/react/Markdown'

import { Announcement } from './types'
import { useAnnouncementsImage } from 'hooks/useAnnouncementsImage'

interface AnnouncementsDialogContentProps {
  isLast: boolean
  announcement: Announcement
  onNext: () => void
  onLast: () => void
}

const AnnouncementsDialogContent: FC<AnnouncementsDialogContentProps> = ({
  isLast,
  announcement,
  onNext,
  onLast
}) => {
  const { t, f } = useI18n()
  const primaryImage = useAnnouncementsImage(
    announcement.primary_image.data.formats.small?.url ??
      announcement.primary_image.data.url
  )
  const secondaryImage = useAnnouncementsImage(
    announcement.secondary_image.data?.formats.thumbnail
      .url
  )

  const handleMainAction = (): void => {
    if (announcement.main_action?.link) {
      window.open(announcement.main_action.link, '_blank')
    }
  }

  return (
    <div className="u-flex u-flex-column u-flex-items-center u-mh-2 u-mh-1-s">
      {primaryImage ? (
        <img
          src={primaryImage}
          alt={
            announcement.primary_image.data
              .alternativeText
          }
          className="u-mt-1 u-mb-2 u-bdrs-3 u-maw-100"
          style={{
            objectFit: 'cover',
            objectPosition: '100% 0'
          }}
        />
      ) : null}
      <Typography align="center" className="u-mb-half" variant="h3">
        {announcement.title}
      </Typography>
      <Typography
        align="center"
        color="textSecondary"
        className="u-mb-1"
        variant="body2"
      >
        {f(
          announcement.start_at,
          t('AnnouncementsDialogContent.dateFormat')
        )}
      </Typography>
      <div className="u-ta-center u-maw-100">
        <Markdown content={announcement.content} />
      </div>
      {announcement.main_action ? (
        <Buttons
          fullWidth
          className="u-mb-half"
          variant="secondary"
          label={announcement.main_action.label}
          onClick={handleMainAction}
        />
      ) : null}
      <Buttons
        fullWidth
        label={t(
          isLast
            ? 'AnnouncementsDialogContent.understand'
            : 'AnnouncementsDialogContent.next'
        )}
        variant="secondary"
        onClick={isLast ? onLast : onNext}
      />
      {secondaryImage ? (
        <img
          src={secondaryImage}
          alt={
            announcement.secondary_image.data?.alternativeText
          }
          className="u-mt-1 u-w-2 u-h-2"
          style={{
            objectFit: 'cover',
            objectPosition: '100% 0'
          }}
        />
      ) : null}
    </div>
  )
}

export { AnnouncementsDialogContent }
