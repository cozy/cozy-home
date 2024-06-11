import { useState, useEffect, useMemo } from 'react'
import { useCustomWallpaperContext } from './useCustomWallpaperContext'
import { useCozyTheme } from 'cozy-ui/transpiled/react/providers/CozyTheme'

export const getHomeThemeCssVariable = (): string => {
  return getComputedStyle(document.getElementsByTagName('body')[0])
    .getPropertyValue('--home-theme')
    .trim()
}

export const usePreferedTheme = (): string => {
  const {
    data: { wallpaperLink, binaryCustomWallpaper, isCustomWallpaper }
  } = useCustomWallpaperContext()
  const { type } = useCozyTheme()
  const defaultVariant = useMemo(
    () => (type === 'dark' ? 'normal' : 'inverted'),
    [type]
  )
  const [preferedVariant, setPreferedVariant] = useState(defaultVariant)

  useEffect(() => {
    const variantFromCSS = getHomeThemeCssVariable()

    if (isCustomWallpaper) {
      setPreferedVariant(defaultVariant)
    } else {
      setPreferedVariant(variantFromCSS || defaultVariant)
    }
  }, [wallpaperLink, binaryCustomWallpaper, isCustomWallpaper, defaultVariant])

  return preferedVariant
}
