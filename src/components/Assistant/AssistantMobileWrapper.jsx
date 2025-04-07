import cx from 'classnames'
import React from 'react'

import { getFlagshipMetadata } from 'cozy-device-helper'

import CozyTheme, {
  useCozyTheme
} from 'cozy-ui/transpiled/react/providers/CozyTheme'

import { useWallpaperContext } from 'hooks/useWallpaperContext'
import { AssistantMobile } from 'cozy-search'

export const AssistantMobileWrapper = () => {
  const { type } = useCozyTheme()

  const {
    data: { isCustomWallpaper }
  } = useWallpaperContext()

  return (
    <CozyTheme variant="normal">
      <div
        className={cx('home-mobile-assistant', {
          [`home-mobile-assistant--${type}`]: !isCustomWallpaper,
          ['home-mobile-assistant--immersive']: getFlagshipMetadata().immersive
        })}
      >
        <AssistantMobile />
      </div>
    </CozyTheme>
  )
}

export default AssistantMobileWrapper
