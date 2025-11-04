import { useState, useEffect } from 'react'
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
        const link = await localForage.getItem('customWallpaper')
        if (link) {
          setWallpaperLink(link)
          setFetchStatus('loaded')
          return
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

  /**
   * Sets the wallpaper link and stores it in localForage.
   *
   * This function updates the wallpaper link state and stores the provided link
   * in localForage. It also updates the localStorage flag indicating that a custom
   * wallpaper is set.
   *
   * @async
   * @param {string} link - The wallpaper link to be set.
   * @returns {Promise<void>}
   */
  const setWallpaperLinkAndStore = async link => {
    setWallpaperLink(link)
    if (link === cozyDefaultWallpaper) {
      await localForage.removeItem('customWallpaper')
      localStorage.setItem('hasCustomWallpaper', false)
      setBinaryCustomWallpaper(null)
    } else {
      localStorage.setItem('hasCustomWallpaper', true)
      await localForage.setItem('customWallpaper', link)
    }
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
      isCustomWallpaper: Boolean(
        (wallpaperLink && wallpaperLink !== cozyDefaultWallpaper) ||
          binaryCustomWallpaper
      )
    },
    setWallpaperLink: setWallpaperLinkAndStore,
    returnToDefaultWallpaper,
    fetchStatus
  }
}

export default useWallpaper
