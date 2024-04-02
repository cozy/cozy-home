import localForage from 'localforage'
import { useState, useEffect } from 'react'

import { useClient } from 'cozy-client'

import homeConfig from 'config/home.json'

const useCustomWallpaper = () => {
  const client = useClient()
  const [wallpaperLink, setWallpaperLink] = useState(null)
  const [fetchStatus, setFetchStatus] = useState('idle')
  const [binaryCustomWallpaper, setBinaryCustomWallpaper] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      // happy path, in order to avoid a flash of the default wallpaper
      if (localStorage.getItem('hasCustomWallpaper') !== 'true') {
        const { cozyDefaultWallpaper } = client.getInstanceOptions()
        setWallpaperLink(cozyDefaultWallpaper)
      }
      try {
        setFetchStatus('loading')
        const binary = await localForage.getItem('customWallpaper')
        if (binary) {
          setBinaryCustomWallpaper(binary)
        }
        const response = await client
          .collection('io.cozy.files')
          .getDownloadLinkByPath(homeConfig.customWallpaperPath)
        setWallpaperLink(response)
        setFetchStatus('loaded')
        const fetchBinary = await fetch(response)
        const blob = await fetchBinary.blob()
        const reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onloadend = async () => {
          const base64data = reader.result
          setBinaryCustomWallpaper(base64data)
          await localForage.setItem('customWallpaper', base64data)
          localStorage.setItem('hasCustomWallpaper', true)
        }
      } catch (error) {
        await localForage.removeItem('customWallpaper')
        localStorage.setItem('hasCustomWallpaper', false)
        const { cozyDefaultWallpaper } = client.getInstanceOptions()
        setWallpaperLink(cozyDefaultWallpaper)
        setBinaryCustomWallpaper(null)
        setFetchStatus('failed')
      }
    }
    fetchData()
  }, [client])

  return {
    data: { wallpaperLink, binaryCustomWallpaper },
    fetchStatus
  }
}

export default useCustomWallpaper
