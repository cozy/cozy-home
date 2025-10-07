import React from 'react'

import CozyTheme, {
  useCozyTheme
} from 'cozy-ui/transpiled/react/providers/CozyTheme'

import styles from './widgets.styl'

import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import Typography from 'cozy-ui/transpiled/react/Typography'
import Icon from 'cozy-ui/transpiled/react/Icon'
import Button from 'cozy-ui/transpiled/react/Buttons'

import { ClockWidget, WidgetProps as ClockWidgetProps } from './Apps/ClockWidget'
import { PapillonWidget, WidgetProps as PapillonWidgetProps } from './Apps/PapillonWidget'
import { DriveWidget, WidgetProps as DriveWidgetProps} from './Apps/DriveWidget'

import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import Button from 'cozy-ui/transpiled/react/Buttons'
import AppIcon from 'cozy-ui/transpiled/react/AppIcon'

import BottomSheet, { BottomSheetHeader, BottomSheetItem, BottomSheetTitle } from 'cozy-ui/transpiled/react/BottomSheet'

import Fab from 'cozy-ui/transpiled/react/Fab'
import Icon from 'cozy-ui/transpiled/react/Icon'
import List from 'cozy-ui/transpiled/react/List'
import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import Checkbox from 'cozy-ui/transpiled/react/Checkbox'
import ListItemSecondaryAction from 'cozy-ui/transpiled/react/ListItemSecondaryAction'
import ListSubheader from 'cozy-ui/transpiled/react/ListSubheader'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import { useClient } from 'cozy-client'
import WidgetListItem from './WidgetListItem'

const AvailableWidgets = [
  {
    name: 'clock',
    component: ClockWidget,
    props: ClockWidgetProps
  },
  {
    name: 'papillon',
    component: PapillonWidget,
    props: PapillonWidgetProps
  },
  {
    name: 'drive',
    component: DriveWidget,
    props: DriveWidgetProps
  }
]

export const WidgetsWrapper = () => {
  const { type } = useCozyTheme()
  const { isMobile } = useBreakpoints()
  const client = useClient()
  const { t } = useI18n()

  const [installedWidgets, setInstalledWidgets] = React.useState(isMobile ? [2] : [1, 2])
  const [customWidgetsOpen, setCustomWidgetsOpen] = React.useState(false)

  const uninstallWidget = (widgetIndex) => {
    setInstalledWidgets(installedWidgets.filter(i => i !== widgetIndex))
  }

  const installWidget = (widgetIndex) => {
    if (installedWidgets.length >= 2) return
    setInstalledWidgets([...installedWidgets, widgetIndex])
  }

  return (
    <>
      {!isMobile && (
        <div
          style={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 10
          }}
        >
          <Fab
            onClick={() => setCustomWidgetsOpen(true)}
          >
            <Icon icon="plus" />
          </Fab>
        </div>
      )}

      {customWidgetsOpen && (
        <BottomSheet
          onClose={() => setCustomWidgetsOpen(false)}
          backdrop={true}
          styles={{
            root: {
              maxWidth: '500px',
            }
          }}
        >
          <BottomSheetTitle label="Personnaliser les widgets" />
          <BottomSheetItem disableGutters>
            <List subheader={<ListSubheader>Installés ({installedWidgets.length}/2)</ListSubheader>}>
              {installedWidgets.map((widgetIndex) => {
                const widget = AvailableWidgets[widgetIndex]
                return (
                  <WidgetListItem
                    key={widgetIndex}
                    widget={widget}
                    client={client}
                    onRemove={() => uninstallWidget(widgetIndex)}
                  />
                )
              })}
            </List>

            <List subheader={<ListSubheader>Disponibles</ListSubheader>}>
              {AvailableWidgets.filter((_, index) => !installedWidgets.includes(index)).map((widget) => (
                <WidgetListItem
                  key={AvailableWidgets.indexOf(widget)}
                  widget={widget}
                  client={client}
                  button
                  onAdd={() => installWidget(AvailableWidgets.indexOf(widget))}
                />
              ))}
            </List>
          </BottomSheetItem>
        </BottomSheet>
      )}

      <div className={`app-list-wrapper ${styles[`app-widget-container`]} u-flex ${isMobile ? 'u-flex-column u-ph-1': 'u-flex-row'} u-mh-auto ${!isMobile ? 'u-mb-3' : ''}`}>
        {installedWidgets.map((widgetIndex) => {
          const WidgetComponent = AvailableWidgets[widgetIndex].component
          return (
            <WidgetComponent key={widgetIndex} />
          )
        })}
      </div>

      {isMobile && (
        <div
          className="u-mb-3"
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1rem'
          }}
        >
          <Button
            onClick={() => setCustomWidgetsOpen(true)}
            size="small"
            label={t('Widget.customize')}
            variant="primary"
            startIcon={<Icon size={14} style={{marginRight: 4}} icon="plus" />}
          />
        </div>
      )}
    </>
  )
}

export default WidgetsWrapper
