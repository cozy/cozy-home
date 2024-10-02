import React, { FC } from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Buttons from 'cozy-ui/transpiled/react/Buttons'
import Markdown from 'cozy-ui/transpiled/react/Markdown'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'

import { Announcement } from './types'
import { useAnnouncementsImage } from 'hooks/useAnnouncementsImage'

interface AnnouncementsDialogContentProps {
  announcement: Announcement
  onSkip: () => void
}

const AnnouncementsDialogContent: FC<AnnouncementsDialogContentProps> = ({
  announcement,
  onSkip
}) => {
  const { isMobile } = useBreakpoints()
  const { t, f } = useI18n()
  const primaryImage = useAnnouncementsImage(
    announcement.attributes.primary_image.data.attributes.formats.small?.url ??
      announcement.attributes.primary_image.data.attributes.url
  )
  const secondaryImage = useAnnouncementsImage(
    announcement.attributes.secondary_image.data?.attributes.formats.thumbnail
      .url
  )

  const handleMainAction = (): void => {
    if (announcement.attributes.main_action?.link) {
      window.open(announcement.attributes.main_action.link, '_blank')
    }
  }

  return (
    <div className="u-flex u-flex-column u-flex-items-center u-mh-2 u-mh-1-s">
      {primaryImage ? (
        <img
          src={primaryImage}
          alt={
            announcement.attributes.primary_image.data.attributes
              .alternativeText
          }
          className="u-mb-2 u-bdrs-3 u-maw-100 u-mt-2-s"
          style={{
            objectFit: 'cover',
            objectPosition: '100% 0',
            maxHeight: '14rem'
          }}
        />
      ) : null}
      <Typography align="center" className="u-mb-half" variant="h3">
        {announcement.attributes.title}
      </Typography>
      <Typography
        align="center"
        color="textSecondary"
        className="u-mb-1"
        variant="body2"
      >
        {f(
          announcement.attributes.start_at,
          t('AnnouncementsDialogContent.dateFormat')
        )}
      </Typography>
      <div className="u-ta-center u-maw-100">
        <Markdown content={announcement.attributes.content} />
      </div>
      {announcement.attributes.main_action ? (
        <Buttons
          fullWidth
          className="u-mb-half"
          variant="secondary"
          label={announcement.attributes.main_action.label}
          onClick={handleMainAction}
        />
      ) : null}
      <Buttons
        fullWidth
        label={t('AnnouncementsDialogContent.skip')}
        variant="secondary"
        onClick={onSkip}
      />
      {secondaryImage ? (
        <img
          src={secondaryImage}
          alt={
            announcement.attributes.secondary_image.data?.attributes
              .alternativeText
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
