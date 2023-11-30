import React, { useRef } from 'react'

import PointerAlert from 'cozy-ui/transpiled/react/PointerAlert'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'

import { useContainerDimensions } from 'hooks/useContainerDimensions'

const BASE_FONTSIZE = 16

const APP_TILE_MOBILE_REM = 4.25
const APP_TILE_DESKTOP_REM = 6

const APP_TILE_MOBILE_PADDING_DIFFERENCE = (0.625 - 0.5) * 2
const APP_TILE_DESKTOP_PADDING_DIFFERENCE = 0

const AppHighlightAlert = ({
  apps,
  appToHighlightSlug,
  onClose,
  description
}) => {
  const { isMobile } = useBreakpoints()
  const ref = useRef(null)
  const { width: containerWidth } = useContainerDimensions(ref)

  const appToHighlightIndex = apps.findIndex(
    app => app.slug === appToHighlightSlug
  )

  if (appToHighlightIndex === -1) {
    return null
  }

  const APP_TILE_REM_WIDTH = isMobile
    ? APP_TILE_MOBILE_REM
    : APP_TILE_DESKTOP_REM

  const DIFFERENCE_REM = isMobile
    ? APP_TILE_MOBILE_PADDING_DIFFERENCE
    : APP_TILE_DESKTOP_PADDING_DIFFERENCE

  const APP_TILE_PX_WIDTH =
    APP_TILE_REM_WIDTH * BASE_FONTSIZE - DIFFERENCE_REM * BASE_FONTSIZE

  const rowIndex =
    Math.trunc((appToHighlightIndex * APP_TILE_PX_WIDTH) / containerWidth) + 1

  const leftAbsolutePosition =
    ((appToHighlightIndex * APP_TILE_PX_WIDTH) % containerWidth) +
    APP_TILE_PX_WIDTH / 2

  return (
    <PointerAlert
      ref={ref}
      icon={false}
      onClose={onClose}
      severity="secondary"
      style={{
        position: 'relative',
        gridRow: rowIndex,
        gridColumn: '1 / -1',
        paddingTop: 0,
        paddingBottom: 0,
        marginBottom: '1.25rem' // to correspond to the margin of SquareAppIcon name in the CSS Grid
      }}
      direction="bottom"
      position={`${leftAbsolutePosition}px`}
    >
      {description}
    </PointerAlert>
  )
}

export default AppHighlightAlert
