import React, { useRef, useState } from "react";

import Fab from 'cozy-ui/transpiled/react/Fab'
import Icon from 'cozy-ui/transpiled/react/Icon'
import Paper from 'cozy-ui/transpiled/react/Paper'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { Fade, Grow, Popper } from '@material-ui/core';
import { PersonalizationModal } from "./PersonalizationModal";
import useBreakpoints from "cozy-ui/transpiled/react/providers/Breakpoints";
import BottomSheet, { BottomSheetHeader, BottomSheetItem, BottomSheetTitle } from 'cozy-ui/transpiled/react/BottomSheet'


export const PersonalizationWrapper = () => {
  const { isMobile } = useBreakpoints()

  const [openAppMenu, setOpenAppMenu] = useState(false);
  const ref = useRef(null);

  const toggleAppMenu = () => {
    setOpenAppMenu(!openAppMenu);
  }

  const radius = 12;

  return (
    <>
      <div
        style={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 10
        }}
        key={"personalize-fab-container"}
      >
        <Fab
          onClick={() => toggleAppMenu()}
          ref={ref}
          key={"personalize-fab"}
          style={{
            borderRadius: 50,
          }}
        >
          <Icon
            icon={"pen"}
            key={"personalize-fab-icon"}
            color={"var(--primaryColor)"}
            size={18}
          />
        </Fab>
      </div>

      {isMobile && openAppMenu && (
        <BottomSheet
          onClose={() => setOpenAppMenu(false)}
          key={"personalize-bottom-sheet"}
          backdrop
        >
          <div>
            <PersonalizationModal />
          </div>
        </BottomSheet>
      )}
      
      {!isMobile && (
        <Popper id={"popper"} open={openAppMenu} anchorEl={ref.current} transition
          style={{
            zIndex: 10
          }}
        >
          {({ TransitionProps }) => (
              <Grow
              {...TransitionProps}
              style={{ transformOrigin: 'right bottom' }}
            >
                <Paper
                  elevation={8}
                  style={{
                    marginRight: 14,
                    marginBottom: 14,
                    borderRadius: radius
                  }}
                >
                  <div
                    style={{
                      width: 300,
                      height: 440,
                      overflow: 'hidden',
                      borderRadius: radius
                    }}
                  >
                    <PersonalizationModal />
                  </div>
                </Paper>
            </Grow>
          )}
        </Popper>
      )}
    </>
  )
}