import React from 'react'

import { useBreakpoints } from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { Dialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import Paper from 'cozy-ui/transpiled/react/Paper'

import { useSearch } from '../SearchProvider'
import ResultMenuContent from './ResultMenuContent'

import styles from './styles.styl'

const ResultMenu = ({ onClick, onClose }) => {
  const { isMobile } = useBreakpoints()
  const { searchValue } = useSearch()

  if (!searchValue) return null

  if (isMobile)
    return (
      <Dialog
        open
        transitionDuration={0}
        disablePortal
        disableAutoFocus
        hideBackdrop
        componentsProps={{
          dialogTitle: {
            style: { height: 'calc(6rem + var(--flagship-top-height, 0px))' }
          },
          divider: { className: 'u-dn' }
        }}
        title={' '}
        content={<ResultMenuContent hasArrowDown onClick={onClick} />}
        onClose={onClose}
      />
    )

  return (
    <Paper className={styles['resultMenu-desktop']}>
      <ResultMenuContent onClick={onClick} />
    </Paper>
  )
}

export default ResultMenu
