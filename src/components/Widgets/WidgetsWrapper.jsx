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

export const WidgetsWrapper = () => {
  const { type } = useCozyTheme()
  const { isMobile } = useBreakpoints()

  return (
    <CozyTheme variant="normal">
      <div className={`app-list-wrapper ${styles[`app-widget-container`]} u-flex ${isMobile ? 'u-flex-column u-ph-1': 'u-flex-row'} u-mh-auto u-mb-3`}>
        <PapillonWidget />
        <ClockWidget />
      </div>
    </CozyTheme>
  )
}

export const Widget = ({
  children,
  title = 'Widget',
  icon = 'grid',
  headerShown = true,
  link = null
}) => {
  const { type } = useCozyTheme()
  const { t } = useI18n()

  return (
    <div className={`${styles[`app-widget`]} ${styles[`app-widget-background--${type}`]} u-flex u-flex-column u-mh-auto u-bdrs-8`}>
      {headerShown && (
        <div className={`${styles[`app-widget-header`]} ${styles[`app-widget-header-background--${type}`]} u-flex u-flex-row u-pl-1 ${link ? '' : 'u-pr-1'}`}>
          <Icon size={16} icon={icon} />
          <Typography variant="body2" className="u-flex-grow-1" component="h2">
            {title}
          </Typography>
          {link && (
            <Button
              label={t('Widget.open')}
              variant="text"
              size="small"
              endIcon={<Icon size={12} icon="rise" />}
              onClick={() => {
                window.location.href = link
              }}
            />
          )}
        </div>
      )}
      <div className={`${styles[`app-widget-children`]}`}>
        {children}
      </div>
    </div>
  )
}

export default WidgetsWrapper
