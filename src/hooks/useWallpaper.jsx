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
        returnToDefaultWallpaper()
        setFetchStatus('failed')
      }
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client, cozyDefaultWallpaper])

  /**
   * Updates the wallpaper state in memory and storage.
   *
   * This function updates the wallpaper link state, stores or removes the link
   * in localForage, and updates the localStorage flag indicating whether a custom
   * wallpaper is set.
   *
   * @async
   * @param {string} link - The wallpaper link to be set.
   * @param {boolean} hasCustom - Whether this is a custom wallpaper (default: true).
   * @returns {Promise<void>}
   */
  const updateWallpaperState = async (link, hasCustom = true) => {
    setWallpaperLink(link)
    await localForage.setItem('customWallpaper', hasCustom ? link : null)
    localStorage.setItem('hasCustomWallpaper', hasCustom)
  }

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
    if (link === cozyDefaultWallpaper) {
      await updateWallpaperState(cozyDefaultWallpaper, false)
      return
    }

    await updateWallpaperState(link, true)
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
    await updateWallpaperState(cozyDefaultWallpaper, false)
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
    await clearBinary()
    await updateWallpaperState(cozyDefaultWallpaper, false)
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
