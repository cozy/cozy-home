import { useState, useEffect } from 'react'
import useCustomWallpaper from 'hooks/useCustomWallpaper'
import { useClient } from 'cozy-client'

const getHomeThemeCssVariable = (): string => {
  return getComputedStyle(
    document.getElementsByTagName('body')[0]
  ).getPropertyValue('--home-theme')
}

export const usePreferedTheme = (): string => {
  const client = useClient()
  const {
    fetchStatus,
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
  }, [wallpaperLink, fetchStatus, client])

  return preferedTheme
}
