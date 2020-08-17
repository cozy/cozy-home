import { useState, useEffect } from 'react'
import { Registry } from 'cozy-client'

const useRegistryInformation = (client, slug) => {
  const [appData, setAppData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const registry = new Registry({
        client
      })
      const app = await registry.fetchApp(slug)
      setAppData(app)
    }
    fetchData()
  }, [client, slug])

  return appData
}

export default useRegistryInformation
