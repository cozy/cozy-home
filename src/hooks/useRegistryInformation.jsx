import { useState, useEffect } from 'react'
import { Registry } from 'cozy-client'

const useRegistryInformation = (client, slug) => {
  const [appData, setAppData] = useState(null)
  const registry = new Registry({
    client
  })

  useEffect(
    () => {
      const fetchData = async () => {
        const app = await registry.fetchApp(slug)
        setAppData(app)
      }
      fetchData()
    },
    [slug]
  )

  return appData
}

export default useRegistryInformation
