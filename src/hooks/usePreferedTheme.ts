import { useState, useEffect } from 'react'
import useCustomWallpaper from 'hooks/useCustomWallpaper'

const getHomeThemeCssVariable = (): string => {
  return getComputedStyle(document.getElementsByTagName('body')[0])
    .getPropertyValue('--home-theme')
    .trim()
}

export const usePreferedTheme = (): string => {
  const {
    data: { wallpaperLink }
  } = useCustomWallpaper()
  const [preferedTheme, setPreferedTheme] = useState('inverted')

  useEffect(() => {
    const preferedTheme = getHomeThemeCssVariable()

    if (wallpaperLink) {
      setPreferedTheme('inverted')
    } else {
      setPreferedTheme(preferedTheme || 'inverted')
    }
  }, [wallpaperLink])

  return preferedTheme
}
