import React, { useRef, useState } from 'react'

import Fab from 'cozy-ui/transpiled/react/Fab'
import Icon from 'cozy-ui/transpiled/react/Icon'
import Paper from 'cozy-ui/transpiled/react/Paper'
import { Grow, Popper, ClickAwayListener } from '@material-ui/core'
import { PersonalizationModal } from './PersonalizationModal'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import BottomSheet from 'cozy-ui/transpiled/react/BottomSheet'
import styles from './Personalization.styl'

export const PersonalizationWrapper = () => {
  const { isMobile } = useBreakpoints()

  const [openAppMenu, setOpenAppMenu] = useState(false)
  const ref = useRef(null)

  const toggleAppMenu = () => {
    setOpenAppMenu(!openAppMenu)
  }

  return (
    <>
      <div
        className={`${styles['personalize-fab-container']} u-pos-fixed u-bottom-m u-right-m`}
        key={'personalize-fab-container'}
      >
        <Fab
          onClick={() => toggleAppMenu()}
          ref={ref}
          key="personalize-fab"
          className="u-bdrs-circle"
        >
          <Icon
            icon="pen"
            key="personalize-fab-icon"
            color="var(--primaryColor)"
            size={18}
          />
        </Fab>
      </div>

      {isMobile && openAppMenu && (
        <BottomSheet
          onClose={() => setOpenAppMenu(false)}
          key="personalize-bottom-sheet"
          backdrop
        >
          <div>
            <PersonalizationModal />
          </div>
        </BottomSheet>
      )}

      {!isMobile && (
        <Popper
          id="popper"
          open={openAppMenu}
          anchorEl={ref.current}
          transition
          className={styles['personalize-popper']}
        >
          {({ TransitionProps }) => (
            <ClickAwayListener onClickAway={() => setOpenAppMenu(false)}>
              <Grow {...TransitionProps} className={styles['personalize-grow']}>
                <Paper elevation={8} className="u-mr-1 u-mb-1 u-bdrs-6">
                  <div
                    className={`${styles['personalize-modal-container']} u-bdrs-6 u-ov-hidden`}
                  >
                    <PersonalizationModal />
                  </div>
                </Paper>
              </Grow>
            </ClickAwayListener>
          )}
        </Popper>
      )}
    </>
  )
}
