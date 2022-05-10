import { useState, useEffect } from 'react'
import get from 'lodash/get'

import { Q } from 'cozy-client'

const useInstanceSettings = client => {
  const [settings, setSettings] = useState({})
  const [fetchStatus, setFetchStatus] = useState('idle')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const instanceSettings = client.getQueryFromState(
          'io.cozy.settings/instance'
        )
        if (
          instanceSettings &&
          (instanceSettings.fetchStatus === 'loaded' ||
            instanceSettings.lastFetch)
        ) {
          setSettings(get(instanceSettings, 'data.attributes', {}))
          setFetchStatus('loaded')
        } else {
          setFetchStatus('loading')
        }
        const response = await client.query(
          Q('io.cozy.settings').getById('instance')
        )
        setSettings(get(response, 'data.attributes'), {})
        setFetchStatus('loaded')
      } catch (error) {
        setFetchStatus('failed')
      }
    }
    fetchData()
  }, [client])
  return {
    data: settings,
    fetchStatus
  }
}

export default useInstanceSettings
