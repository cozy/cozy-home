import React from 'react'

import Paper from 'cozy-ui/transpiled/react/Paper'
import Popper from 'cozy-ui/transpiled/react/Popper'

import ResultMenuContent from './ResultMenuContent'

import styles from './styles.styl'

const ResultMenu = ({ anchorRef, listRef, onClick }) => {
  return (
    <Popper
      style={{
        width: anchorRef.current.offsetWidth,
        zIndex: 'var(--zIndex-popover)'
      }}
      anchorEl={anchorRef.current}
      open={Boolean(anchorRef.current)}
      placement="bottom-start"
    >
      <Paper className={styles['resultMenu']} square>
        <div className={styles['resultMenu-inner']}>
          <ResultMenuContent ref={listRef} onClick={onClick} />
        </div>
      </Paper>
    </Popper>
  )
}

export default ResultMenu
