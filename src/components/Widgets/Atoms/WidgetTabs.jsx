import { useAppLinkWithStoreFallback, useClient, useQuery } from 'cozy-client'
import React, { useMemo, useState } from 'react'
import { buildAccountsQuery, buildGradesQuery } from '../../Queries'

import List from 'cozy-ui/transpiled/react/List'
import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import Icon from 'cozy-ui/transpiled/react/Icon'
import Tabs from 'cozy-ui/transpiled/react/Tabs'
import Tab from 'cozy-ui/transpiled/react/Tab'
import { getSubjectName } from '../../Utils/subjectName'
import Typography from 'cozy-ui/transpiled/react/Typography'
import ListItemSecondaryAction from 'cozy-ui/transpiled/react/ListItemSecondaryAction'
import Button from 'cozy-ui/transpiled/react/Buttons'
import { useCozyTheme } from 'cozy-ui/transpiled/react/providers/CozyTheme'
import { LinearProgress, CircularProgress } from 'cozy-ui/transpiled/react/Progress';
import Tooltip from 'cozy-ui/transpiled/react/Tooltip';
import Menu from 'cozy-ui/transpiled/react/Menu'
import MenuItem from 'cozy-ui/transpiled/react/MenuItem'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import Divider from 'cozy-ui/transpiled/react/Divider'

import AppIcon from 'cozy-ui/transpiled/react/AppIcon'

import { Transition } from 'react-transition-group';

import styles from './widget.styl'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

export const WidgetTabs = ({
  tabs,
  app,
  layoutControls,
  defaultTab = 0,
  onTabChange,
  index
}) => {
  const { type } = useCozyTheme()
  const { t } = useI18n()
  const client = useClient()
  const [selectedTab, setSelectedTab] = useState(defaultTab)

  const i = index && index[0] ? index[0] : 0
  const j = index && index[1] ? index[1] - 1 : 0

  const appLink = useAppLinkWithStoreFallback(app, client, '/')

  const [menuOpened, setMenuOpened] = React.useState(false)
  const ref = React.useRef(null)

  const toggleMenu = () => {
    setMenuOpened(!menuOpened)
  }

  const closeMenu = () => {
    setMenuOpened(false)
  }

  const changeTab = (index) => {
    setSelectedTab(index)
    if (onTabChange) {
      onTabChange(index)
    }
  }

  if (!tabs || tabs.length === 0) {
    return (
      <UnimplementedWidgetView label="No tabs available" />
    )
  }

  const tabButtonStyle = {
    width: '32px',
    maxWidth: '32px',
    minWidth: '32px',
    height: '32px',
    borderRadius: 50,
    padding: 0,
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
      }}
    >

      <div
        style={{
          flex: 1,
          overflowY: 'hidden',
          position: 'relative',
        }}
      >
        <div style={{ position: 'relative', minHeight: '100%' }}>
          {tabs.map((tab, index) => {
            const isActive = index === selectedTab
            const content = typeof tab.render === 'function' ? tab.render() : tab.render

            return (
              <Transition in={isActive} timeout={0} key={tab.label} mountOnEnter>
                {state => () => {
                  try {
                    return (
                      <div
                        key={tab.label}
                        style={{
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          inset: 0,
                          zIndex: isActive ? 3 : 2,
                          pointerEvents: isActive ? 'all' : 'none',
                        }}
                        className={`${styles[`app-tab`]} ${styles[`app-tab--${state}`]}`}
                      >
                        {content}
                      </div>
                    )
                  } catch (e) {
                    console.error('Error rendering widget tab content:', e)
                    return (
                      <></>
                    )
                  }
                }}
              </Transition>
            )
          })}
        </div>
      </div>

      <div
        style={{
          padding: '8px 8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around',
          gap: 8
        }}
      >
        <Button
          key={"app:" + app}
          ref={ref}
          label={
            <div
              style={{
                width: '20px',
                height: '20px',
              }}
            >
              <AppIcon
                client={client}
                app={app}
                priority="registry"
                type="app"
              />
            </div>
          }
          variant={'text'}
          aria-controls="simple-menu"
          aria-haspopup="true"
          size="small"
          onClick={toggleMenu}
          color={'inherit'}
          style={tabButtonStyle}
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
          <MenuItem onClick={() => { layoutControls("up"); }} disabled={i == 0}>
            <ListItemIcon>
              <Icon icon="up" />
            </ListItemIcon>
            <ListItemText primary={t('Widget.up')} />
          </MenuItem>

          <MenuItem onClick={() => { layoutControls("down"); }} disabled={j == i}>
            <ListItemIcon>
              <Icon icon="up" style={{rotate: '180deg'}} />
            </ListItemIcon>
            <ListItemText primary={t('Widget.down')} />
          </MenuItem>

          <Divider className="u-mv-half" />

          <MenuItem onClick={() => { closeMenu(); window.location.href = appLink.url; }}>
            <ListItemIcon>
              <Icon icon="openapp" />
            </ListItemIcon>
            <ListItemText primary={t('Widget.openApp')} />
          </MenuItem>

          <MenuItem onClick={() => { layoutControls("uninstall"); closeMenu(); }}>
            <ListItemIcon>
              <Icon icon="trash" />
            </ListItemIcon>
            <ListItemText primary={t('Widget.remove')} />
          </MenuItem>
        </Menu>

        {tabs.map((tab, index) => (
          <Button
            key={tab.label}
            onClick={() => changeTab(index)}
            label={
              <Icon
                icon={tab.icon}
                color={selectedTab === index ? 'var(--primaryColor)' : undefined}
              />
            }
            variant={selectedTab === index ? 'ghost' : 'text'}
            size="small"
            color={selectedTab === index ? 'primary' : 'inherit'}
            style={tabButtonStyle}
          />
        ))}
      </div>
    </div>
  )
}

export const UnimplementedWidgetView = ({
  label = "Unimplemented"
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography style={{ marginBottom: '0rem' }} variant="body2" color="textSecondary">
        {label}
      </Typography>
    </div>
  )
}

export const LoadingWidgetView = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress />
    </div>
  )
}

export default WidgetTabs
