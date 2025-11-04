import { useEffect, useRef, useState } from 'react'
import { useClient } from 'cozy-client'
import localForage from 'localforage'
import homeConfig from '@/config/home.json'

const BLOB_KEY = 'customWallpaperBlob'
const HAS_BLOB_FLAG = 'hasCustomWallpaperBlob'

/**
 * Fetches the wallpaper file from Cozy at `/Settings/Home/Wallpaper`,
 * caches it as a Blob in IndexedDB via localForage, and exposes a blob URL.
 *
 * @returns {Object}
 */
const useBinaryWallpaper = () => {
  const client = useClient()

  const [blobUrl, setBlobUrl] = useState(null)
  const [status, setStatus] = useState('idle')
  const currentUrlRef = useRef(null)

  const revokeCurrentUrl = () => {
    if (currentUrlRef.current) {
      URL.revokeObjectURL(currentUrlRef.current)
      currentUrlRef.current = null
    }
  }

  /**
   * Loads the cached wallpaper blob from IndexedDB and creates an object URL.
   *
   * This function checks if there is a cached wallpaper blob in IndexedDB and
   * creates an object URL from it. It is used to display the cached wallpaper
   * in the UI.
   *
   * @async
   * @returns {Promise<boolean>} - True if the cached blob is loaded, false otherwise.
   */
  const loadFromCache = async () => {
    try {
      const hasFlag = localStorage.getItem(HAS_BLOB_FLAG) === 'true'
      if (!hasFlag) return false

      const cachedBlob = await localForage.getItem(BLOB_KEY)
      if (!cachedBlob) return false

      revokeCurrentUrl()
      const url = URL.createObjectURL(cachedBlob)
      currentUrlRef.current = url
      setBlobUrl(url)
      setStatus('loaded')
      return true
    } catch {
      return false
    }
  }

  /**
   * Fetches the wallpaper file from Cozy and caches it locally.
   *
   * This function is used to fetch the wallpaper file from Cozy and cache it
   * locally. It is typically called when the wallpaper needs to be updated or
   * when the user wants to preview the new wallpaper.
   *
   * @async
   * @returns {Promise<void>}
   */
  const fetchAndCache = async () => {
    try {
      setStatus('loading')

      const responseLink = await client
        .collection('io.cozy.files')
        .getDownloadLinkByPath(`${homeConfig.customWallpaperPath}/Wallpaper`)

      const resp = await fetch(responseLink)
      if (!resp.ok) throw new Error('Failed to fetch wallpaper blob')
      const blob = await resp.blob()

      await localForage.setItem(BLOB_KEY, blob)
      localStorage.setItem(HAS_BLOB_FLAG, 'true')

      // Create a fresh object URL
      revokeCurrentUrl()
      const url = URL.createObjectURL(blob)
      currentUrlRef.current = url
      setBlobUrl(url)
      setStatus('loaded')
    } catch (e) {
      // Cleanup cache and state on failure
      await localForage.removeItem(BLOB_KEY)
      localStorage.setItem(HAS_BLOB_FLAG, 'false')
      revokeCurrentUrl()
      setBlobUrl(null)
      setStatus('failed')
    }
  }

  /**
   * Saves a custom wallpaper file to Cozy Drive and refreshes the local binary cache.
   *
   * This function ensures the destination directory exists, removes any existing
   * wallpaper file at the configured location, uploads the new file, and refreshes
   * the cache and object URL used for previewing.
   *
   * @async
   * @param {File} file - The wallpaper file to upload and save.
   * @returns {Promise<void>}
   */
  const saveCustomWallpaper = async file => {
    try {
      const fileCollection = client.collection('io.cozy.files')
      const dirId = await fileCollection.ensureDirectoryExists(
        homeConfig.customWallpaperPath
      )
      try {
        const { data: existingFile } = await fileCollection.statByPath(
          `${homeConfig.customWallpaperPath}/Wallpaper`
        )
        if (existingFile?._id) {
          await fileCollection.deleteFilePermanently(existingFile._id)
        }
      } catch (_) {
        // If the file does not exist yet, ignore
      }
      await fileCollection.createFile(file, {
        dirId,
        name: 'Wallpaper'
      })
      await fetchAndCache()
    } catch (_) {
      // If the fetch failed user just won't see the new background file
    }
  }

  /**
   * Clears the custom wallpaper from Cozy Drive and removes associated local caches/state.
   *
   * This function attempts to delete the wallpaper file from Cozy Drive at the configured path.
   * Regardless of whether this deletion succeeds, local cached binary blobs, object URLs,
   * and status are always cleared and reset.
   *
   * @async
   * @returns {Promise<void>}
   */
  const clearCustomWallpaper = async () => {
    try {
      const fileCollection = client.collection('io.cozy.files')
      try {
        const { data: existingFile } = await fileCollection.statByPath(
          `${homeConfig.customWallpaperPath}/Wallpaper`
        )
        if (existingFile?._id) {
          await fileCollection.deleteFilePermanently(existingFile._id)
        }
      } catch (e) {
        // If the file does not exist, ignore
      }
    } finally {
      // Always clear local caches and reset state
      await localForage.removeItem(BLOB_KEY)
      localStorage.setItem(HAS_BLOB_FLAG, 'false')
      revokeCurrentUrl()
      setBlobUrl(null)
      setStatus('idle')
    }
  }

  useEffect(() => {
    let mounted = true
    ;(async () => {
      // Try to hydrate from cache first to avoid flashes
      const hydrated = await loadFromCache()
      if (!mounted) return
      if (!hydrated) {
        await fetchAndCache()
      }
    })()

    return () => {
      mounted = false
      revokeCurrentUrl()
    }
    // We depend on the Cozy client instance and configuration
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client])

  return {
    blobUrl,
    status,
    clearCustomWallpaper,
    saveCustomWallpaper
  }
}

export default useBinaryWallpaper
