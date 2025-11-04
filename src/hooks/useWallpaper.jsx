import { useState, useEffect } from 'react'
import { useClient } from 'cozy-client'
import localForage from 'localforage'
import useBinaryWallpaper from './useBinaryWallpaper'

const useWallpaper = () => {
  const client = useClient()
  const [wallpaperLink, setWallpaperLink] = useState(null)
  const [fetchStatus, setFetchStatus] = useState('idle')
  const { cozyDefaultWallpaper } = client.getInstanceOptions()

  const {
    blobUrl,
    clearCustomWallpaper: clearBinary,
    saveCustomWallpaper
  } = useBinaryWallpaper()

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

  /**
   * Resets the wallpaper to the Cozy default wallpaper.
   *
   * This function sets the wallpaper link back to the default wallpaper,
   * removes any custom wallpaper reference from localForage storage,
   * and updates the localStorage flag indicating that there is no custom wallpaper.
   *
   * @async
   * @returns {Promise<void>}
   */
  const returnToDefaultWallpaper = async () => {
    setWallpaperLink(cozyDefaultWallpaper)
    await localForage.removeItem('customWallpaper')
    localStorage.setItem('hasCustomWallpaper', false)
  }

  /**
   * Clears the custom wallpaper.
   *
   * This function deletes the binary wallpaper file, clears all related caches,
   * and resets the wallpaper to the Cozy default wallpaper. It also updates
   * localForage and localStorage to reflect that no custom wallpaper is currently set.
   *
   * @async
   * @returns {Promise<void>}
   */
  const clearCustomWallpaper = async () => {
    // Delete the binary file, clear caches and return to default wallpaper
    await clearBinary()
    setWallpaperLink(cozyDefaultWallpaper)
    await localForage.removeItem('customWallpaper')
    localStorage.setItem('hasCustomWallpaper', false)
  }

  return {
    data: {
      binaryCustomWallpaper: blobUrl,
      wallpaperLink,
      isCustomWallpaper: Boolean(
        blobUrl || (wallpaperLink && wallpaperLink !== cozyDefaultWallpaper)
      )
    },
    setWallpaperLink: setWallpaperLinkAndStore,
    returnToDefaultWallpaper,
    fetchStatus,
    clearCustomWallpaper,
    saveCustomWallpaper
  }
}

export default useWallpaper
