import React from 'react'
import cx from 'classnames'

import ActionsMenu from 'cozy-ui/transpiled/react/ActionsMenu'
import Button from 'cozy-ui/transpiled/react/Buttons'
import CozyTheme from 'cozy-ui/transpiled/react/providers/CozyTheme'
import Divider from 'cozy-ui/transpiled/react/MuiCozyTheme/Divider'
import DotsIcon from 'cozy-ui/transpiled/react/Icons/Dots'
import Icon from 'cozy-ui/transpiled/react/Icon'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import { actions } from 'components/Sections/SectionActions'
import { computeGroupMode } from 'components/Sections/utils'
import {
  GroupMode,
  SectionHeaderProps
} from 'components/Sections/SectionsTypes'

export const SectionHeader = ({
  section,
  anchorRef,
  toggleMenu,
  menuState
}: SectionHeaderProps): JSX.Element | null => {
  const { isMobile } = useBreakpoints()
  const isGroupMode =
    (section && computeGroupMode(isMobile, section)) === GroupMode.GROUPED
  const isCategory = section?.type === 'category'
  const { t } = useI18n()
  return (
    <>
      <div className="u-flex u-w-100 u-flex-justify-between u-flex-items-center">
        {!isGroupMode ? (
          <Divider className="u-mv-0 u-flex-grow-1" variant="subtitle2">
            {section?.name}
          </Divider>
        ) : isCategory ? (
          <div className="u-ellipsis">{t(`category.${section.name}`)}</div>
        ) : (
          <div className="u-ellipsis u-mr-half">{section?.name}</div>
        )}

        {!isCategory && section && (
          <Button
            className={cx({
              ['u-p-1']: !isGroupMode,
              ['u-p-0']: isGroupMode,
              ['u-h-auto']: isGroupMode
            })}
            label={<Icon icon={DotsIcon} color="var(--secondaryColor)" />}
            onClick={toggleMenu}
            ref={anchorRef}
            variant="text"
          />
        )}
      </div>

      {section && (
        <CozyTheme>
          <ActionsMenu
            actions={actions}
            anchorOrigin={{
              horizontal: 'right',
              vertical: 'bottom'
            }}
            autoClose
            docs={[section]}
            onClose={toggleMenu}
            open={menuState}
            ref={anchorRef}
          />
        </CozyTheme>
      )}
    </>
  )
}
