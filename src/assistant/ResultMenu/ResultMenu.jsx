import React from 'react'

import Paper from 'cozy-ui/transpiled/react/Paper'
import Popper from 'cozy-ui/transpiled/react/Popper'

import ResultMenuContent from './ResultMenuContent'

import styles from './styles.styl'

const ResultMenu = ({ anchorRef, onClick }) => {
  return (
    <Popper
      style={{ width: anchorRef.current.offsetWidth }}
      anchorEl={anchorRef.current}
      open={Boolean(anchorRef.current)}
      placement="bottom-start"
    >
      <Paper className={styles['resultMenu']} square>
        <div className={styles['resultMenu-inner']}>
          <ResultMenuContent onClick={onClick} />
        </div>
      </Paper>
    </Popper>
  )
}

export default ResultMenu
