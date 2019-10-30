import { useState, useEffect } from 'react'
import get from 'lodash/get'

const useInstanceSettings = client => {
  const [settings, setSettings] = useState({})
  const [fetchStatus, setFetchStatus] = useState('idle')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchStatus('loading')
        const response = await client
          .getStackClient()
          .fetchJSON('GET', '/settings/instance')
        setSettings(get(response, 'data.attributes'), {})
        setFetchStatus('loaded')
      } catch (error) {
        setFetchStatus('failed')
      }
    }
    fetchData()
  }, [])

  return {
    data: settings,
    fetchStatus
  }
}

export default useInstanceSettings
