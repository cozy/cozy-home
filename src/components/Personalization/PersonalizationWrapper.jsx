import React, { useRef, useState } from 'react'

import Fab from 'cozy-ui/transpiled/react/Fab'
import Icon from 'cozy-ui/transpiled/react/Icon'
import Paper from 'cozy-ui/transpiled/react/Paper'
import { Grow, Popper, ClickAwayListener } from '@material-ui/core'
import { PersonalizationModal } from './PersonalizationModal'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import BottomSheet from 'cozy-ui/transpiled/react/BottomSheet'
import styles from './Personalization.styl'
import flag from 'cozy-flags'
import cx from 'classnames'

export const PersonalizationWrapper = () => {
  const { isMobile } = useBreakpoints()

  const [openAppMenu, setOpenAppMenu] = useState(false)
  const [isPopperAnimationComplete, setIsPopperAnimationComplete] =
    useState(false)
  const ref = useRef(null)

  const toggleAppMenu = () => {
    setOpenAppMenu(!openAppMenu)
    if (openAppMenu) {
      setIsPopperAnimationComplete(false)
    }
  }

  const handlePopperEntered = () => {
    setIsPopperAnimationComplete(true)
  }

  return (
    <>
      <div
        className={cx(
          styles['personalize-fab-container'],
          'u-pos-fixed',
          'u-right-m',
          flag('cozy.searchbar.enabled') ? 'u-bottom-xl' : 'u-bottom-l'
        )}
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
          <div className={styles['personalize-bottomSheet-content']}>
            <PersonalizationModal isAnimationComplete={true} />
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
          placement="bottom-end"
          modifiers={{ offset: { offset: '0,8' } }}
        >
          {({ TransitionProps }) => (
            <ClickAwayListener onClickAway={() => setOpenAppMenu(false)}>
              <Grow
                {...TransitionProps}
                className={styles['personalize-grow']}
                onEntered={handlePopperEntered}
              >
                <Paper elevation={8} className="u-mr-1 u-mb-1 u-bdrs-6">
                  <div
                    className={`${styles['personalize-modal-container']} u-bdrs-6 u-ov-hidden`}
                  >
                    <PersonalizationModal
                      isAnimationComplete={isPopperAnimationComplete}
                      showCloseButton
                      onClose={() => setOpenAppMenu(false)}
                    />
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
