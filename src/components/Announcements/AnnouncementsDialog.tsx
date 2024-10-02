import React, { useState, FC } from 'react'
import SwipeableViews from 'react-swipeable-views'

import {
  FixedActionsDialog,
  DialogCloseButton
} from 'cozy-ui/transpiled/react/CozyDialogs'
import CozyTheme from 'cozy-ui/transpiled/react/providers/CozyTheme'
import MobileStepper from 'cozy-ui/transpiled/react/MobileStepper'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import Icon from 'cozy-ui/transpiled/react/Icon'
import LeftIcon from 'cozy-ui/transpiled/react/Icons/Left'
import RightIcon from 'cozy-ui/transpiled/react/Icons/Right'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'

import { AnnouncementsDialogContent } from './AnnouncementsDialogContent'
import { Announcement } from './types'
import { useAnnouncementsSettings } from 'hooks/useAnnouncementsSettings'

interface AnnouncementsDialogProps {
  announcements: Array<Announcement>
  onDismiss: () => void
}

const AnnouncementsDialog: FC<AnnouncementsDialogProps> = ({
  announcements,
  onDismiss
}) => {
  const { values, save } = useAnnouncementsSettings()
  const { isMobile } = useBreakpoints()

  const [activeStep, setActiveStep] = useState(0)
  const [unSkippedAnnouncements, setUnSkippedAnnouncements] =
    useState(announcements)

  const handleBack = (): void => {
    setActiveStep(activeStep - 1)
  }

  const handleNext = (): void => {
    setActiveStep(activeStep + 1)
  }

  const handleChangedIndex = (index: number): void => {
    setActiveStep(index)
  }

  const handleSkip = (): void => {
    const uuid = unSkippedAnnouncements[activeStep].attributes.uuid
    const isLast = activeStep === maxSteps - 1

    if (!values.seen.includes(uuid)) {
      save({
        seen: [...values.seen, uuid],
        ...(isLast ? { dismissedAt: new Date().toISOString() } : {})
      })
    }

    if (unSkippedAnnouncements.length === 1) {
      onDismiss()
    } else {
      setUnSkippedAnnouncements(
        unSkippedAnnouncements.filter(a => a.attributes.uuid !== uuid)
      )
      if (isLast) {
        setActiveStep(activeStep - 1)
      }
    }
  }

  const handleDismiss = (): void => {
    save({
      dismissedAt: new Date().toISOString()
    })
    onDismiss()
  }

  const maxSteps = unSkippedAnnouncements.length

  // Having a title on flagship is required to have margin top
  // This also provides a close button instead of the default back button
  const extraProps = isMobile
    ? {
        title: <DialogCloseButton onClick={handleDismiss} />
      }
    : {
        onClose: handleDismiss
      }

  return (
    <CozyTheme variant="normal">
      <FixedActionsDialog
        open
        content={
          <SwipeableViews
            index={activeStep}
            onChangeIndex={handleChangedIndex}
            animateTransitions={isMobile}
          >
            {unSkippedAnnouncements.map(announcement => (
              <AnnouncementsDialogContent
                key={announcement.attributes.uuid}
                announcement={announcement}
                onSkip={handleSkip}
              />
            ))}
          </SwipeableViews>
        }
        actions={
          maxSteps > 1 ? (
            <MobileStepper
              className="u-mh-auto"
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <IconButton
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                >
                  <Icon icon={RightIcon} />
                </IconButton>
              }
              backButton={
                <IconButton onClick={handleBack} disabled={activeStep === 0}>
                  <Icon icon={LeftIcon} />
                </IconButton>
              }
            />
          ) : null
        }
        {...extraProps}
      />
    </CozyTheme>
  )
}

export { AnnouncementsDialog }
