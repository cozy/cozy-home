import { useState, useEffect } from 'react'
import { useCustomWallpaperContext } from './useCustomWallpaperContext'
import { useClient } from 'cozy-client'

const getHomeThemeCssVariable = (): string => {
  return getComputedStyle(document.getElementsByTagName('body')[0])
    .getPropertyValue('--home-theme')
    .trim()
}

export const usePreferedTheme = (): string => {
  const {
    data: { wallpaperLink, binaryCustomWallpaper }
  } = useCustomWallpaperContext()
  const client = useClient()
  const [preferedTheme, setPreferedTheme] = useState('inverted')
  // @ts-expect-error client is not typed
  const { cozyDefaultWallpaper } = client.getInstanceOptions()
  useEffect(() => {
    const preferedTheme = getHomeThemeCssVariable()

    if (
      (wallpaperLink && wallpaperLink !== cozyDefaultWallpaper) ||
      binaryCustomWallpaper
    ) {
      setPreferedTheme('inverted')
    } else {
      setPreferedTheme(preferedTheme || 'inverted')
    }
  }, [wallpaperLink, binaryCustomWallpaper, cozyDefaultWallpaper])
  return preferedTheme
}
