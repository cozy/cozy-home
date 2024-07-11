import { useState, useEffect } from 'react'
import homeConfig from 'config/home.json'
import { useClient } from 'cozy-client'
import localForage from 'localforage'

const useWallpaper = () => {
  const client = useClient()
  const [wallpaperLink, setWallpaperLink] = useState(null)
  const [fetchStatus, setFetchStatus] = useState('idle')
  const [binaryCustomWallpaper, setBinaryCustomWallpaper] = useState(null)
  const { cozyDefaultWallpaper } = client.getInstanceOptions()

  useEffect(() => {
    const fetchData = async () => {
      // happy path, in order to avoid a flash of the default wallpaper
      if (localStorage.getItem('hasCustomWallpaper') !== 'true') {
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
        setWallpaperLink(cozyDefaultWallpaper)
        setBinaryCustomWallpaper(null)
        setFetchStatus('failed')
      }
    }
    fetchData()
  }, [client, cozyDefaultWallpaper])

  return {
    data: {
      wallpaperLink,
      binaryCustomWallpaper,
      isCustomWallpaper: Boolean(
        (wallpaperLink && wallpaperLink !== cozyDefaultWallpaper) ||
          binaryCustomWallpaper
      )
    },
    fetchStatus
  }
}

export default useWallpaper
