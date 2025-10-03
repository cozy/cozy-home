import React, { memo } from 'react'

import CozyTheme, {
  useCozyTheme
} from 'cozy-ui/transpiled/react/providers/CozyTheme'

import styles from './widget.styl'

import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import Typography from 'cozy-ui/transpiled/react/Typography'
import Icon from 'cozy-ui/transpiled/react/Icon'
import AppIcon from 'cozy-ui/transpiled/react/AppIcon'
import Button from 'cozy-ui/transpiled/react/Buttons'
import { useClient } from 'cozy-client'

export const Widget = ({
  children,
  title = 'Widget',
  icon = 'grid',
  app = null,
  headerShown = true,
  link = null
}) => {
  const { type } = useCozyTheme()
  const client = useClient()
  const { t } = useI18n()

  return (
    <div className={`${styles[`app-widget`]} ${styles[`app-widget-background--${type}`]} u-flex u-flex-column u-mh-auto u-bdrs-8`}>
      {headerShown && (
        <div className={`${styles[`app-widget-header`]} ${styles[`app-widget-header-background--${type}`]} u-flex u-flex-row u-pl-1 ${link ? '' : 'u-pr-1'}`}>
          <div
            style={{
              width: 20,
              height: 20,
              marginLeft: -2,
            }}
          >
            {app ? (
              <AppIcon
                client={client}
                app={app}
                priority="registry"
              />
            ) : (
              <Icon size={20} icon={icon} />
            )}
          </div>
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
              style={{
                marginRight: 3
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

export default Widget
