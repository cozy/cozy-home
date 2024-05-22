import React from 'react'

import ActionsMenu from 'cozy-ui/transpiled/react/ActionsMenu'
import Button from 'cozy-ui/transpiled/react/Buttons'
import Divider from 'cozy-ui/transpiled/react/MuiCozyTheme/Divider'
import DotsIcon from 'cozy-ui/transpiled/react/Icons/Dots'
import Icon from 'cozy-ui/transpiled/react/Icon'
import flag from 'cozy-flags'

import { actions } from 'components/Sections/SectionActions'
import { SectionHeaderProps } from 'components/Sections/SectionsTypes'

export const SectionHeader = ({
  name,
  anchorRef,
  toggleMenu,
  menuState,
  handleAction
}: SectionHeaderProps): JSX.Element => (
  <>
    <Divider className="u-mv-0" variant="subtitle2">
      {name}
    </Divider>

    {flag('home.detailed_section.show_more-dev') && (
      <>
        <Button
          label={<Icon icon={DotsIcon} />}
          ref={anchorRef}
          onClick={toggleMenu}
        />
        <ActionsMenu
          ref={anchorRef}
          open={menuState}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          docs={[name]}
          actions={actions}
          autoClose
          onClose={toggleMenu}
          componentsProps={{
            actionsItems: { actionOptions: { handleAction } }
          }}
        />
      </>
    )}
  </>
)
