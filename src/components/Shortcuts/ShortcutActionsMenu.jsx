import React, { useState, useRef } from 'react'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import ActionsMenu from 'cozy-ui/transpiled/react/ActionsMenu'
import Icon from 'cozy-ui/transpiled/react/Icon'
import DotsIcon from 'cozy-ui/transpiled/react/Icons/Dots'
import { editShortcut } from './actions/editShortcut'
import { deleteShortcut } from './actions/deleteShortcut'
import cx from 'classnames'

import { useBreakpoints } from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { makeActions } from 'cozy-ui/transpiled/react/ActionsMenu/Actions'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import { useClient } from 'cozy-client'

import styles from './shortcut.styl'
import ShortcutEditModal from './ShortcutEditModal'

const ShortcutActionsMenu = ({
  isMenuOpen,
  setIsMenuOpen,
  file,
  shortcutInfos
}) => {
  const client = useClient()
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()
  const anchorRef = useRef(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const actions = makeActions([editShortcut, deleteShortcut], {
    file,
    showEditModal: () => setIsEditModalOpen(true),
    client,
    t
  })

  return (
    <>
      {!isMobile && (
        <IconButton
          ref={anchorRef}
          size="small"
          className={cx(
            styles['shortcut-actions-menu'],
            isMenuOpen && styles['shortcut-actions-menu--visible']
          )}
          onClick={() => {
            setIsMenuOpen(true)
          }}
        >
          <Icon icon={DotsIcon} rotate={90} />
        </IconButton>
      )}
      <ActionsMenu
        ref={anchorRef}
        open={isMenuOpen}
        actions={actions}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        onClose={() => setIsMenuOpen(false)}
      />
      {isEditModalOpen && (
        <ShortcutEditModal
          file={file}
          shortcutInfos={shortcutInfos}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </>
  )
}

export default ShortcutActionsMenu
