import React from 'react'

import BottomSheet, {
  BottomSheetItem
} from 'cozy-ui/transpiled/react/BottomSheet'
import { useBreakpoints } from 'cozy-ui/transpiled/react/providers/Breakpoints'
import Paper from 'cozy-ui/transpiled/react/Paper'

import { useSearch } from '../SearchProvider'
import ResultMenuContent from './ResultMenuContent'

import styles from './styles.styl'

const ResultMenu = ({ anchorRef, onClick }) => {
  const { isMobile } = useBreakpoints()
  const { searchValue } = useSearch()

  if (!searchValue) return null

  if (isMobile)
    return (
      <BottomSheet
        portalProps={{ container: anchorRef?.current }}
        settings={{ hasMinHeightOffset: true }}
        offset={70}
      >
        <BottomSheetItem disableGutters>
          <ResultMenuContent onClick={onClick} />
        </BottomSheetItem>
      </BottomSheet>
    )

  return (
    <Paper className={styles['resultMenu-desktop']}>
      <ResultMenuContent onClick={onClick} />
    </Paper>
  )
}

export default ResultMenu
