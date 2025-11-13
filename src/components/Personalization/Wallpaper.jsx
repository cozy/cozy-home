import React, { useEffect, useState, useRef } from 'react'

import logger from 'cozy-logger'
import { useWallpaperContext } from '@/hooks/useWallpaperContext'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import cx from 'classnames'

import styles from './Wallpaper.styl'
import { Wallpapers, ALLOWED_WALLPAPER_TYPES } from './wallpapers'
import { WallpaperItem } from './WallpaperItem'
import { getCurrentWallpaperKey } from './wallpaperUtils'

const Wallpaper = () => {
  const [currentWallpaper, setCurrentWallpaper] = useState()
  const { isMobile } = useBreakpoints()

  const {
    data,
    setWallpaperLink,
    returnToDefaultWallpaper,
    clearCustomWallpaper,
    saveCustomWallpaper
  } = useWallpaperContext()

  const fileInputRef = useRef(null)

  const handleFileSelected = async event => {
    const file = event.target?.files?.[0]
    if (!file) return

    if (!ALLOWED_WALLPAPER_TYPES.has(file.type)) {
      logger.error('Unsupported file type selected:', file.type || '(unknown)')
      event.target.value = ''
      return
    }

    await saveCustomWallpaper(file)

    // Allow selecting the same file again by resetting the input value
    event.target.value = ''
  }

  const handleWallpaperSelect = async wallpaper => {
    setCurrentWallpaper(wallpaper.key)

    if (wallpaper.role === 'import') {
      fileInputRef.current.click()
      return
    }

    await clearCustomWallpaper()

    if (wallpaper.role === 'default') {
      returnToDefaultWallpaper()
      return
    }

    setWallpaperLink('/assets/backgrounds/' + wallpaper.image)
  }

  const handleRemoveCustomWallpaper = async () => {
    await clearCustomWallpaper()
    setCurrentWallpaper('bg_twp_default')
  }

  useEffect(() => {
    const wallpaperKey = getCurrentWallpaperKey(data?.wallpaperLink, Wallpapers)
    setCurrentWallpaper(wallpaperKey)
  }, [data?.wallpaperLink])

  const containerClassName = cx(styles['wallpaperGrid'], 'u-m-1', 'u-mt-0', {
    [styles['wallpaperGrid--bottomSheet']]: isMobile
  })

  return (
    <div className={containerClassName}>
      <input
        ref={fileInputRef}
        type="file"
        className="u-dn"
        accept={Array.from(ALLOWED_WALLPAPER_TYPES).join(',')}
        onChange={handleFileSelected}
      />
      {Wallpapers.map(wallpaper => (
        <WallpaperItem
          key={wallpaper.label}
          wallpaper={wallpaper}
          isSelected={currentWallpaper === wallpaper.key}
          binaryCustomWallpaper={data?.binaryCustomWallpaper}
          onSelect={() => handleWallpaperSelect(wallpaper)}
          onRemove={handleRemoveCustomWallpaper}
        />
      ))}
    </div>
  )
}

export default Wallpaper
