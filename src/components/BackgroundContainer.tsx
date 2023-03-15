import React, { useEffect, useState } from 'react'
// @ts-expect-error -- TODO: type useCustomWallpaper
import useCustomWallpaper from 'hooks/useCustomWallpaper'
import { useClient } from 'cozy-client'

type BackgroundContainerComputedProps = {
  className: string
  style?: { backgroundImage: string }
}

const makeProps = (
  backgroundURL: string | null
): BackgroundContainerComputedProps => ({
  className: 'background-container',
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

  const [backgroundURL, setBackgroundURL] = useState<string | null>(null)

  useEffect(() => {
    const { cozyDefaultWallpaper } = client?.getInstanceOptions() as {
      cozyDefaultWallpaper: string
    }
    setBackgroundURL(wallpaperLink || cozyDefaultWallpaper)
  }, [wallpaperLink, fetchStatus, client])
  return <div {...makeProps(backgroundURL)} />
}
