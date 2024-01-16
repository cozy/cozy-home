import { useState, useEffect } from 'react'
import { useCustomWallpaperContext } from './useCustomWallpaperContext'

const getHomeThemeCssVariable = (): string => {
  return getComputedStyle(document.getElementsByTagName('body')[0])
    .getPropertyValue('--home-theme')
    .trim()
}

export const usePreferedTheme = (): string => {
  const {
    data: { wallpaperLink, binaryCustomWallpaper }
  } = useCustomWallpaperContext()
  const [preferedTheme, setPreferedTheme] = useState('inverted')

  useEffect(() => {
    const preferedTheme = getHomeThemeCssVariable()

    if (wallpaperLink || binaryCustomWallpaper) {
      setPreferedTheme('inverted')
    } else {
      setPreferedTheme(preferedTheme || 'inverted')
    }
  }, [wallpaperLink, binaryCustomWallpaper])

  return preferedTheme
}
