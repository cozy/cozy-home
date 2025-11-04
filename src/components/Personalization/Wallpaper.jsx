import React, { useEffect, useState, useRef } from 'react'

import Typography from 'cozy-ui/transpiled/react/Typography'

import { useWallpaperContext } from '@/hooks/useWallpaperContext'
import { useDefaultWallpaper } from '@/hooks/useDefaultWallpaper'

import styles from './Wallpaper.styl'
import { useCozyTheme } from 'cozy-ui/transpiled/react/providers/CozyTheme'

const Wallpapers = [
  {
    key: 'bg_twp_default',
    label: 'Twake Default',
    role: 'default'
  },
  {
    key: 'bg_custom',
    role: 'import',
    label: 'Importer',
    image: 'role_import.svg'
  },
  {
    key: 'bg_twp_orbitalblue',
    label: 'Orbital Blue',
    image: 'bg_twp_orbitalblue.jpg'
  },
  {
    key: 'bg_twp_earlymorning',
    label: 'Early Morning',
    image: 'bg_twp_earlymorning.jpg'
  },
  {
    key: 'bg_twp_eclipse',
    label: 'Eclipse',
    image: 'bg_twp_eclipse.svg'
  },
  {
    key: 'bg_twp_solarglass',
    label: 'Solar Glass',
    image: 'bg_twp_solarglass.jpg'
  },
  {
    key: 'bg_twp_stripes',
    label: 'Stripes',
    image: 'bg_twp_stripes.svg'
  },
  {
    key: 'bg_twp_stellarburst',
    label: 'Stellar Burst',
    image: 'bg_twp_stellarburst.jpg'
  }
]

const Wallpaper = () => {
  const [currentWallpaper, setCurrentWallpaper] = useState('bg_twp_default')

  const { data, setWallpaperLink, returnToDefaultWallpaper } = useWallpaperContext()
  const defaultWallpaper = useDefaultWallpaper()

  const { type } = useCozyTheme()

  useEffect(() => {
    if (data?.wallpaperLink) {
      const wp = Wallpapers.find(
        wp => wp.image === data.wallpaperLink.split('/').pop()
      )
      if (wp) {
        setCurrentWallpaper(wp.key)
      } else {
        setCurrentWallpaper('bg_custom')
      }
    } else {
      setCurrentWallpaper()
    }
  }, [data?.wallpaperLink])

  return (
    <div className={`${styles['wallpaperGrid']} u-m-1 u-mt-0`}>
      {Wallpapers.map(wallpaper => (
        <div
          key={wallpaper.label}
          className={`${styles['wallpaperItem']} ${
            styles['wallpaperItem--' + type]
          } ${
            currentWallpaper === wallpaper.key
              ? styles['wallpaperItem--selected']
              : ''
          } u-c-pointer u-ov-hidden u-pos-relative u-bdrs-6`}
          onClick={() => {
            setCurrentWallpaper(wallpaper.key)

            if (wallpaper.role === 'default') {
              returnToDefaultWallpaper()
              return
            }
            if (wallpaper.role === 'import') {
              return;
            }
            setWallpaperLink(
              wallpaper.role === 'import'
                ? null
                : '/assets/backgrounds/' + wallpaper.image
            )
          }}
        >
          <img
            className={`${styles['wallpaperImage']}`}
            src={
              wallpaper.role == 'default'
                ? defaultWallpaper
                : '/assets/backgrounds/' + wallpaper.image
            }
            alt={wallpaper.label}
          />

          <Typography
            variant="caption"
            className={`${styles['wallpaperLabel']}`}
            color={wallpaper.role === 'import' ? 'primary' : 'textSecondary'}
          >
            {wallpaper.label}
          </Typography>
        </div>
      ))}
    </div>
  )
}

export default Wallpaper
