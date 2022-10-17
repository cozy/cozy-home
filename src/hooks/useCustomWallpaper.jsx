import { useState, useEffect } from 'react'
import homeConfig from 'config/home.json'
import { useClient } from 'cozy-client'

const useCustomWallpaper = () => {
  const client = useClient()
  const [wallpaperLink, setWallpaperLink] = useState(null)
  const [fetchStatus, setFetchStatus] = useState('idle')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchStatus('loading')
        const response = await client
          .collection('io.cozy.files')
          .getDownloadLinkByPath(homeConfig.customWallpaperPath)
        setWallpaperLink(response)
        setFetchStatus('loaded')
      } catch (error) {
        setFetchStatus('failed')
      }
    }
    fetchData()
  }, [client])

  return {
    data: { wallpaperLink },
    fetchStatus
  }
}

export default useCustomWallpaper
