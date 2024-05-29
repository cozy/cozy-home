import React from 'react'

import ActionsMenu from 'cozy-ui/transpiled/react/ActionsMenu'
import Button from 'cozy-ui/transpiled/react/Buttons'
import CozyTheme from 'cozy-ui/transpiled/react/providers/CozyTheme'
import Divider from 'cozy-ui/transpiled/react/MuiCozyTheme/Divider'
import DotsIcon from 'cozy-ui/transpiled/react/Icons/Dots'
import Icon from 'cozy-ui/transpiled/react/Icon'
import flag from 'cozy-flags'

import { SectionHeaderProps } from 'components/Sections/SectionsTypes'
import { actions } from 'components/Sections/SectionActions'

export const SectionHeader = ({
  section,
  anchorRef,
  toggleMenu,
  menuState
}: SectionHeaderProps): JSX.Element => (
  <>
    <div className="u-flex u-w-100 u-flex-justify-between">
      <Divider className="u-mv-0 u-flex-grow-1" variant="subtitle2">
        {section.name}
      </Divider>

      {flag('home.detailed-sections.show-more-dev') && (
        <Button
          className="u-p-1"
          label={<Icon icon={DotsIcon} />}
          onClick={toggleMenu}
          ref={anchorRef}
          variant="text"
        />
      )}
    </div>

    <CozyTheme variant="normal">
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
  </>
)
