import React from 'react'

import CozyTheme, {
  useCozyTheme
} from 'cozy-ui/transpiled/react/providers/CozyTheme'

import styles from './widgets.styl'

import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import Typography from 'cozy-ui/transpiled/react/Typography'
import Icon from 'cozy-ui/transpiled/react/Icon'
import Button from 'cozy-ui/transpiled/react/Buttons'

import { ClockWidget } from './Apps/ClockWidget'
import { PapillonWidget } from './Apps/PapillonWidget'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { DriveWidget } from './Apps/DriveWidget'

export const WidgetsWrapper = () => {
  const { type } = useCozyTheme()
  const { isMobile } = useBreakpoints()

  return (
    <CozyTheme variant="normal">
      <div className={`app-list-wrapper ${styles[`app-widget-container`]} u-flex ${isMobile ? 'u-flex-column u-ph-1': 'u-flex-row'} u-mh-auto u-mb-3`}>
        <PapillonWidget />
        <DriveWidget />
      </div>
    </CozyTheme>
  )
}

export default WidgetsWrapper
