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
import DropdownButton from 'cozy-ui/transpiled/react/DropdownButton'
import Menu from 'cozy-ui/transpiled/react/Menu'
import MenuItem from 'cozy-ui/transpiled/react/MenuItem'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'

import { useAppLinkWithStoreFallback, useClient } from 'cozy-client'

export const Widget = ({
  children,
  title = 'Widget',
  icon = 'grid',
  app = null,
  headerShown = true,
  link = null,
  configureable = false,
  onConfigure = () => {},
}) => {
  const { type } = useCozyTheme()
  const client = useClient()
  const { t } = useI18n()

  const appLink = useAppLinkWithStoreFallback(link, client, '/')

  const [menuOpened, setMenuOpened] = React.useState(false)
  const ref = React.useRef(null)

  const toggleMenu = () => {
    setMenuOpened(!menuOpened)
  }

  const closeMenu = () => {
    setMenuOpened(false)
  }

  return (
    <div className={`${styles[`app-widget`]} ${styles[`app-widget-background--${type}`]} u-flex u-flex-column u-mh-auto u-bdrs-8`}>
      {headerShown && (
        <div className={`${styles[`app-widget-header`]} ${styles[`app-widget-header-background--${type}`]} u-flex u-flex-row u-pl-1 ${link ? '' : 'u-pr-1'}`}>
          <div
            className="u-flex u-flex-row u-flex-grow-1"
            onClick={() => {
              window.location.href = appLink.url
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                marginLeft: -2,
                marginRight: 10,
              }}
            >
              {app ? (
                <AppIcon
                  client={client}
                  app={app}
                  priority="registry"
                  type="app"
                />
              ) : (
                <Icon size={20} icon={icon} />
              )}
            </div>
            <Typography variant="body2" className="u-flex-grow-1" component="h2" style={{ marginTop: 1 }}>
              {title}
            </Typography>
          </div>

          <>
            <Button
              ref={ref}
              variant="text"
              color="text"
              label={<Icon size={12} icon="dots" />}
              aria-controls="simple-menu"
              aria-haspopup="true"
              size="small"
              onClick={toggleMenu}
                style={{
                  marginRight: 3,
                  padding: "0px 12px"
                }}
            />

            <Menu
              open={menuOpened}
              anchorEl={ref.current}
              getContentAnchorEl={null}
              keepMounted
              onClose={() => closeMenu()}

              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
            >
              {configureable && (
                <MenuItem onClick={() => { closeMenu(); onConfigure(); }}>
                  <ListItemIcon>
                    <Icon icon="setting" />
                  </ListItemIcon>
                  <ListItemText primary={t('Widget.configure')} />
                </MenuItem>
              )}
              <MenuItem onClick={() => { closeMenu(); window.location.href = appLink.url; }}>
                <ListItemIcon>
                  <Icon icon="openapp" />
                </ListItemIcon>
                <ListItemText primary={t('Widget.openApp')} />
              </MenuItem>
            </Menu>
          </>
        </div>
      )}
      <div className={`${styles[`app-widget-children`]}`}>
        {children}
      </div>
    </div>
  )
}

export default Widget
