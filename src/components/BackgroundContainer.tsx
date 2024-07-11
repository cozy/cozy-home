import React from 'react'
import cx from 'classnames'

import { useCustomWallpaperContext } from 'hooks/useCustomWallpaperContext'
import { useCozyTheme } from 'cozy-ui/transpiled/react/providers/CozyTheme'

export const BackgroundContainer = (): JSX.Element => {
  const {
    data: { binaryCustomWallpaper, isCustomWallpaper }
  } = useCustomWallpaperContext()
  const { type } = useCozyTheme()

  return (
    <div
      className={cx(
        'home-background-container',
        `home-background-container--${type}`,
        {
          'home-default-background': !isCustomWallpaper,
          'home-custom-background': isCustomWallpaper
        }
      )}
      style={
        binaryCustomWallpaper
          ? { backgroundImage: `url(${binaryCustomWallpaper})` }
          : undefined
      }
    >
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
