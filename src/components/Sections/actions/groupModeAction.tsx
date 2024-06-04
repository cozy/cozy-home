import React from 'react'

import ActionsMenuItem from 'cozy-ui/transpiled/react/ActionsMenu/ActionsMenuItem'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import Switch from 'cozy-ui/transpiled/react/Switch'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import { Action } from 'cozy-ui/transpiled/react/ActionsMenu/Actions'
import { useSettings } from 'cozy-client'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { GroupMode, Section, SectionViewProps } from '../SectionsTypes'
import { computeGroupMode, handleSectionAction } from '../utils'

const StateSwitch = ({
  handleClick,
  checked
}: {
  handleClick: () => void
  checked: boolean
}): JSX.Element => {
  return <Switch checked={checked} onChange={handleClick} />
}

export const groupModeAction = (): (() => Action) => () => ({
  name: `sectionAction_group`,
  Component: React.forwardRef<{ docs?: Section[] }>(
    function SectionActionComponent(props: { docs?: Section[] }, ref) {
      const { t } = useI18n()
      const { isMobile } = useBreakpoints()
      const { values, save } = useSettings('home', ['shortcutsLayout'])
      const section = props.docs?.[0] as SectionViewProps['section']
      const currentGroupMode = computeGroupMode(isMobile, section)
      const handleClick = (): void =>
        handleSectionAction(
          section,
          isMobile,
          currentGroupMode === GroupMode.GROUPED
            ? GroupMode.DEFAULT
            : GroupMode.GROUPED,
          values,
          save
        )

      return (
        <ActionsMenuItem {...props} ref={ref}>
          <ListItemText
            className="u-mr-half"
            primary={t(`sections.label_grouped`)}
          />

          <StateSwitch
            handleClick={handleClick}
            checked={currentGroupMode === GroupMode.GROUPED}
          />
        </ActionsMenuItem>
      )
    }
  )
})
