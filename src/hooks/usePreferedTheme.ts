import { useState, useEffect, useMemo } from 'react'
import { useCustomWallpaperContext } from './useCustomWallpaperContext'
import { useClient } from 'cozy-client'
import { useCozyTheme } from 'cozy-ui/transpiled/react/providers/CozyTheme'

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
  const { type } = useCozyTheme()
  const defaultVariant = useMemo(
    () => (type === 'dark' ? 'normal' : 'inverted'),
    [type]
  )
  const [preferedVariant, setPreferedVariant] = useState(defaultVariant)
  // @ts-expect-error client is not typed
  const { cozyDefaultWallpaper } = client.getInstanceOptions()

  useEffect(() => {
    const variantFromCSS = getHomeThemeCssVariable()

    if (
      (wallpaperLink && wallpaperLink !== cozyDefaultWallpaper) ||
      binaryCustomWallpaper
    ) {
      setPreferedVariant(defaultVariant)
    } else {
      setPreferedVariant(variantFromCSS || defaultVariant)
    }
  }, [
    wallpaperLink,
    binaryCustomWallpaper,
    cozyDefaultWallpaper,
    defaultVariant
  ])

  return preferedVariant
}
