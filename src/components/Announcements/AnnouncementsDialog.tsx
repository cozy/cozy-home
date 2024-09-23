import React, { useState, FC } from 'react'
import SwipeableViews from 'react-swipeable-views'

import { FixedActionsDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
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
    const uuid = announcements[activeStep].attributes.uuid
    const isLast = activeStep === maxSteps - 1

    if (!values.seen.includes(uuid)) {
      save({
        seen: [...values.seen, uuid],
        ...(isLast ? { dismissedAt: new Date().toISOString() } : {})
      })
    }

    if (isLast) {
      onDismiss()
    } else {
      setActiveStep(activeStep + 1)
    }
  }

  const handleDismiss = (): void => {
    save({
      dismissedAt: new Date().toISOString()
    })
    onDismiss()
  }

  const maxSteps = announcements.length

  return (
    <CozyTheme variant="normal">
      <FixedActionsDialog
        open
        onClose={handleDismiss}
        content={
          <SwipeableViews
            index={activeStep}
            onChangeIndex={handleChangedIndex}
            animateTransitions={isMobile}
          >
            {announcements.map((announcement, index) => (
              <AnnouncementsDialogContent
                key={index}
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
      />
    </CozyTheme>
  )
}

export { AnnouncementsDialog }