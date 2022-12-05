import React, { useState, useRef } from 'react'

import flag from 'cozy-flags'
import { useQuery, isQueryLoading } from 'cozy-client'
import Fab from 'cozy-ui/transpiled/react/Fab'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { appsConn } from 'queries'
import Icon from 'cozy-ui/transpiled/react/Icon'

import {
  FLAG_FAB_ACTIONS,
  filterAvailableActions,
  reworkActions,
  extendDict,
  DEFAULT_ACTIONS
} from './helpers'

import ActionsBottomSheet from './ActionsBottomSheet'

const styles = {
  fab: {
    right: '1rem',
    bottom: '1rem',
    position: 'fixed'
  }
}

export const AddButton = () => {
  const { lang } = useI18n()
  const anchorRef = useRef()
  const appsResult = useQuery(appsConn.query, appsConn)
  const [isOpen, setIsOpen] = useState(false)
  const showMenu = () => setIsOpen(true)
  const hideMenu = () => setIsOpen(false)

  if (isQueryLoading(appsResult)) return null

  const { data: installedApps } = appsResult

  const flagActions = flag(FLAG_FAB_ACTIONS) || DEFAULT_ACTIONS
  const availableActions = filterAvailableActions(flagActions)
  const actionsLists = reworkActions(availableActions, installedApps)

  extendDict(actionsLists.flat(), lang)

  if (actionsLists.length === 0) return null

  return (
    <>
      <Fab
        color="primary"
        aria-label="add"
        ref={anchorRef}
        style={styles.fab}
        onClick={showMenu}
      >
        <Icon icon="plus" />
      </Fab>
      {isOpen && (
        <ActionsBottomSheet
          hideMenu={hideMenu}
          anchorRef={anchorRef}
          actionsLists={actionsLists}
        />
      )}
    </>
  )
}

export default AddButton
