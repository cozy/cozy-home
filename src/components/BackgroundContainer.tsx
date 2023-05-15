import React, { useEffect, useState } from 'react'
import useCustomWallpaper from 'hooks/useCustomWallpaper'
import { useClient } from 'cozy-client'
import cx from 'classnames'
import { usePreferedTheme } from 'hooks/usePreferedTheme'

type BackgroundContainerComputedProps = {
  className: string
  style?: { backgroundImage: string }
}

const makeProps = (
  backgroundURL: string | null,
  preferedTheme: string
): BackgroundContainerComputedProps => ({
  className: cx('background-container', {
    'background-container-darken': preferedTheme === 'inverted',
    'home-default-partner-background': preferedTheme === 'normal'
  }),
  ...(backgroundURL && {
    style: { backgroundImage: `url(${backgroundURL})` }
  })
})

export const BackgroundContainer = (): JSX.Element => {
  const client = useClient()
  const {
    fetchStatus,
    data: { wallpaperLink }
  } = useCustomWallpaper()
  const preferedTheme = usePreferedTheme()
  const [backgroundURL, setBackgroundURL] = useState<string | null>(null)

  useEffect(() => {
    const { cozyDefaultWallpaper } = client?.getInstanceOptions() as {
      cozyDefaultWallpaper: string
    }
    setBackgroundURL(wallpaperLink || cozyDefaultWallpaper)
  }, [wallpaperLink, fetchStatus, client])

  return (
    <div {...makeProps(backgroundURL, preferedTheme)}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
