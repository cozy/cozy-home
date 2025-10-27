import React, { useEffect, useState } from 'react'

import Typography from 'cozy-ui/transpiled/react/Typography';
import Icon from 'cozy-ui/transpiled/react/Icon';

import { useWallpaperContext } from '@/hooks/useWallpaperContext';
import { useDefaultWallpaper } from '@/hooks/useDefaultWallpaper';

import styles from './Wallpaper.styl'
import { useCozyTheme } from 'cozy-ui/transpiled/react/providers/CozyTheme';

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
    key: 'bg_twp_softpink',
    label: 'Soft Pink',
    image: 'bg_twp_softpink.svg'
  },
  {
    key: 'bg_twp_oceanblue',
    label: 'Ocean Blue',
    image: 'bg_twp_oceanblue.svg'
  },
  {
    key: 'bg_twp_sunset',
    label: 'Sunset',
    image: 'bg_twp_sunset.svg'
  },
  {
    key: 'bg_twp_forest',
    label: 'Forest',
    image: 'bg_twp_forest.svg'
  },
  {
    key: 'bg_twp_lavender',
    label: 'Lavender',
    image: 'bg_twp_lavender.svg'
  },
  {
    key: 'bg_twp_minimalgray',
    label: 'Minimal Gray',
    image: 'bg_twp_minimalgray.svg'
  },
]

const Wallpaper = (client) => {
  const [currentWallpaper, setCurrentWallpaper] = useState('bg_twp_default');

  const { data, setWallpaperLink, returnToDefaultWallpaper } = useWallpaperContext();
  const defaultWallpaper = useDefaultWallpaper()

  const { type } = useCozyTheme()

  useEffect(() => {
    if (data?.wallpaperLink) {
      const wp = Wallpapers.find(wp => wp.image === data.wallpaperLink.split('/').pop())
      if (wp) {
        setCurrentWallpaper(wp.key)
      } else {
        setCurrentWallpaper('bg_custom')
      }
    } else {
      setCurrentWallpaper('bg_twp_default')
    }
  }, [data?.wallpaperLink])

  return (
    <div
      className={`${styles['wallpaperGrid']}`}
    >
      {Wallpapers.map((wallpaper) => (
        <div
          key={wallpaper.label}
          className={`${styles['wallpaperItem']} ${styles['wallpaperItem--' + type]} ${currentWallpaper === wallpaper.key ? styles['wallpaperItem--selected'] : ''}`}
          onClick={() => {
            setCurrentWallpaper(wallpaper.key)

            if (wallpaper.role === 'default') {
              returnToDefaultWallpaper()
              return;
            }
            if (wallpaper.role === 'import') {
              return;
            }
            setWallpaperLink(wallpaper.role === 'import' ? null : "/assets/backgrounds/" + wallpaper.image)
          }}
        >
          <img
            className={`${styles['wallpaperImage']}`}
            src={
              wallpaper.role == 'default' ? defaultWallpaper :
              "/assets/backgrounds/" + wallpaper.image
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