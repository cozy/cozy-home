import React from 'react'

import ActionsMenuItem from 'cozy-ui/transpiled/react/ActionsMenu/ActionsMenuItem'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import Switch from 'cozy-ui/transpiled/react/Switch'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import { Action } from 'cozy-ui/transpiled/react/ActionsMenu/Actions'

const StateSwitch = (): JSX.Element => {
  return <Switch className="u-w-auto u-pr-0" disabled />
}

export const groupModeAction = (): (() => Action) => () => ({
  name: `sectionAction_group`,
  Component: React.forwardRef(function SectionActionComponent(props, ref) {
    const { t } = useI18n()

    return (
      <ActionsMenuItem {...props} ref={ref} disabled>
        <ListItemText
          className="u-mr-half"
          primary={t(`sections.label_grouped`)}
        />

        <StateSwitch />
      </ActionsMenuItem>
    )
  })
})
