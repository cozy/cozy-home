import React from 'react'

import { useSettings } from 'cozy-client'

import ActionsMenuItem from 'cozy-ui/transpiled/react/ActionsMenu/ActionsMenuItem'
import Icon from 'cozy-ui/transpiled/react/Icon'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import ListMin from 'cozy-ui/transpiled/react/Icons/ListMin'
import MosaicMin from 'cozy-ui/transpiled/react/Icons/MosaicMin'
import Radio from 'cozy-ui/transpiled/react/Radios'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { Action } from 'cozy-ui/transpiled/react/ActionsMenu/Actions'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import {
  DisplayMode,
  Section,
  SectionViewProps
} from 'components/Sections/SectionsTypes'
import {
  computeDisplayMode,
  handleSectionAction
} from 'components/Sections/utils'

export const displayModeAction =
  (actionLabel: DisplayMode): (() => Action) =>
  () => ({
    name: `sectionAction_${actionLabel}`,
    Component: React.forwardRef<{ docs?: Section[] }>(
      function SectionActionComponent(props: { docs?: Section[] }, ref) {
        const { isMobile } = useBreakpoints()
        const { values, save } = useSettings('home', ['shortcutsLayout'])
        const section = props.docs?.[0] as SectionViewProps['section']
        const currentDisplayMode = computeDisplayMode(isMobile, section)
        const handleClick = (): void =>
          handleSectionAction(section, isMobile, actionLabel, values, save)
        const { t } = useI18n()
        const isActive = actionLabel === currentDisplayMode

        return (
          <ActionsMenuItem
            {...props}
            ref={ref}
            onClick={handleClick}
            className="u-miw-auto u-w-auto"
          >
            <ListItemIcon>
              <Icon
                icon={actionLabel === DisplayMode.COMPACT ? MosaicMin : ListMin}
              />
            </ListItemIcon>

            <ListItemText
              className="u-mr-half"
              primary={t(`sections.label_${actionLabel}`)}
            />

            <Radio checked={isActive} />
          </ActionsMenuItem>
        )
      }
    )
  })
