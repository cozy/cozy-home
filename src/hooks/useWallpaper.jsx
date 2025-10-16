import { useState, useEffect } from 'react'
import homeConfig from '@/config/home.json'
import { useClient } from 'cozy-client'
import localForage from 'localforage'

const useWallpaper = () => {
  const client = useClient()

  const [wallpaperLink, setWallpaperLink] = useState(null)
  const [fetchStatus, setFetchStatus] = useState('idle')
  const [binaryCustomWallpaper, setBinaryCustomWallpaper] = useState(null)
  const { cozyDefaultWallpaper } = client.getInstanceOptions()
  const [widgets, setWidgets] = useState([1, 2])

  useEffect(() => {
    const fetchData = async () => {
      // happy path, in order to avoid a flash of the default wallpaper
      if (localStorage.getItem('hasCustomWallpaper') !== 'true') {
        setWallpaperLink(cozyDefaultWallpaper)
      }
      try {
        setFetchStatus('loading')
        const link = await localForage.getItem('customWallpaper')
        if (link) {
          setWallpaperLink(link)
          setFetchStatus('loaded')
          return
        }

        /*
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
          */
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

  const setWallpaperLinkAndStore = async link => {
    setWallpaperLink(link)
    if (link === cozyDefaultWallpaper) {
      await localForage.removeItem('customWallpaper')
      localStorage.setItem('hasCustomWallpaper', false)
      setBinaryCustomWallpaper(null)
    }
    localStorage.setItem('hasCustomWallpaper', true)
    await localForage.setItem('customWallpaper', link)
  }

  const returnToDefaultWallpaper = async () => {
    setWallpaperLink(cozyDefaultWallpaper)
    await localForage.removeItem('customWallpaper')
    localStorage.setItem('hasCustomWallpaper', false)
    setBinaryCustomWallpaper(null)
  }

  return {
    data: {
      wallpaperLink,
      binaryCustomWallpaper,
      widgets,
      isCustomWallpaper: Boolean(
        (wallpaperLink && wallpaperLink !== cozyDefaultWallpaper) ||
          binaryCustomWallpaper
      )
    },
    setWallpaperLink: setWallpaperLinkAndStore,
    returnToDefaultWallpaper,
    installWidget: (widgetIndex) => {
      if (widgets.length >= 2) return
      setWidgets([...widgets, widgetIndex])
    },
    uninstallWidget: (widgetIndex) => {
      setWidgets(widgets.filter(i => i !== widgetIndex))
    },
    fetchStatus
  }
}

export default useWallpaper
