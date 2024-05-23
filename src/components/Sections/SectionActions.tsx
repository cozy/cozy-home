import React from 'react'

import ActionsMenuItem from 'cozy-ui/transpiled/react/ActionsMenu/ActionsMenuItem'
import FileIcon from 'cozy-ui/transpiled/react/Icons/File'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import { makeActions } from 'cozy-ui/transpiled/react/ActionsMenu/Actions'
import { Action, DisplayMode } from 'components/Sections/SectionsTypes'
import Icon from 'cozy-ui/transpiled/react/Icon'

const createSectionAction = (primaryText: DisplayMode): (() => Action) => {
  return () => ({
    name: `sectionAction_${primaryText}`,
    action: (_doc, opts): void => {
      opts.handleAction(primaryText)
    },
    Component: React.forwardRef(function SectionActionComponent(props, ref) {
      return (
        <ActionsMenuItem {...props} ref={ref}>
          <ListItemIcon>
            <Icon icon={FileIcon} />
          </ListItemIcon>
          <ListItemText primary={primaryText} />
        </ActionsMenuItem>
      )
    })
  })
}

const actionArray = [
  createSectionAction(DisplayMode.COMPACT),
  createSectionAction(DisplayMode.DETAILED)
]

export const actions = makeActions(actionArray)
