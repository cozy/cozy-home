import React from 'react'
import cx from 'classnames'

import { useCustomWallpaperContext } from 'hooks/useCustomWallpaperContext'
import { getHomeThemeCssVariable } from 'hooks/usePreferedTheme'

type BackgroundContainerComputedProps = {
  className: string
  style?: { backgroundImage: string }
}

const makeProps = (
  backgroundURL: string | null,
  isCustomWallpaper: boolean,
  binaryCustomWallpaper: string | null
): BackgroundContainerComputedProps => ({
  className: cx('background-container', {
    'background-container-darken':
      isCustomWallpaper || getHomeThemeCssVariable() !== 'normal',
    'home-default-partner-background':
      !isCustomWallpaper && getHomeThemeCssVariable() === 'normal'
  }),
  ...(binaryCustomWallpaper && {
    style: { backgroundImage: `url(${binaryCustomWallpaper})` }
  }),
  ...(!binaryCustomWallpaper &&
    backgroundURL && {
      style: { backgroundImage: `url(${backgroundURL})` }
    })
})

export const BackgroundContainer = (): JSX.Element => {
  const {
    data: { wallpaperLink, binaryCustomWallpaper, isCustomWallpaper }
  } = useCustomWallpaperContext()

  return (
    <div
      {...makeProps(wallpaperLink, isCustomWallpaper, binaryCustomWallpaper)}
    >
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
