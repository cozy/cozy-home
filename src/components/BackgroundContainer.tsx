import React from 'react'
import cx from 'classnames'

import { useCozyTheme } from 'cozy-ui-plus/dist/providers/CozyTheme'

import { useDefaultWallpaper } from '@/hooks/useDefaultWallpaper'
import { useWallpaperContext } from '@/hooks/useWallpaperContext'

export const BackgroundContainer = (): JSX.Element => {
  const {
    data: { binaryCustomWallpaper, isCustomWallpaper }
  } = useWallpaperContext()
  const { type } = useCozyTheme()
  const defaultWallpaper = useDefaultWallpaper()

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
      <div />
      <div />
      <div />
      {!isCustomWallpaper && defaultWallpaper && (
        <img className="home-default-background--img" src={defaultWallpaper} />
      )}
    </div>
  )
}
