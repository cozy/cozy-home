import { useState, useEffect } from 'react'

const WALLPAPER_PATH = '/Photos/Settings/Wallpaper.jpg'

const useCustomWallpaper = client => {
  const [wallpaperLink, setWallpaperLink] = useState(null)
  const [fetchStatus, setFetchStatus] = useState('idle')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchStatus('loading')
        const response = await client
          .collection('io.cozy.files')
          .getDownloadLinkByPath(WALLPAPER_PATH)
        setWallpaperLink(response)
        setFetchStatus('loaded')
      } catch (error) {
        setFetchStatus('failed')
      }
    }
    fetchData()
  }, [])

  return {
    data: { wallpaperLink },
    fetchStatus
  }
}

export default useCustomWallpaper
