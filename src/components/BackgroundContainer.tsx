import React, { useEffect, useState } from 'react'
import { useClient } from 'cozy-client'
import cx from 'classnames'
import { useCozyTheme } from 'cozy-ui/transpiled/react/providers/CozyTheme'
import { useCustomWallpaperContext } from 'hooks/useCustomWallpaperContext'
type BackgroundContainerComputedProps = {
  className: string
  style?: { backgroundImage: string }
}

const makeProps = (
  backgroundURL: string | null,
  preferedTheme: string,
  binaryCustomWallpaper: string | null
): BackgroundContainerComputedProps => ({
  className: cx('background-container', {
    'background-container-darken': preferedTheme === 'inverted',
    'home-default-partner-background': preferedTheme === 'normal'
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
    data: { wallpaperLink, binaryCustomWallpaper }
  } = useCustomWallpaperContext()
  const theme = useCozyTheme()

  return (
    <div {...makeProps(wallpaperLink, theme.variant, binaryCustomWallpaper)}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
