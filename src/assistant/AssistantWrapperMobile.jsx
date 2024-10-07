import React from 'react'
import flag from 'cozy-flags'
import cx from 'classnames'

import { getFlagshipMetadata } from 'cozy-device-helper'
import { useBreakpoints } from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { useCozyTheme } from 'cozy-ui/transpiled/react/providers/CozyTheme'

import AssistantBar from 'assistant/AssistantBar'

import styles from './styles.styl'

export const AssistantWrapperMobile = () => {
  const { isMobile } = useBreakpoints()
  const { type } = useCozyTheme()

  if (!flag('cozy.assistant.enabled') || !isMobile) return null

  return (
    <div
      className={cx(
        styles['assistantWrapper-mobile'],
        styles[`assistantWrapper-mobile--${type}`],
        {
          [styles['assistantWrapper-mobile--offset']]: flag(
            'home.fab.button.enabled'
          ),
          [styles['assistantWrapper-mobile--immersive']]:
            getFlagshipMetadata().immersive
        }
      )}
    >
      <AssistantBar />
    </div>
  )
}

export default AssistantWrapperMobile
