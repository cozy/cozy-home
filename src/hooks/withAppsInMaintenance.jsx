import { useState, useEffect } from 'react'
import { Registry } from 'cozy-client'

const useAppsInMaintenance = client => {
  const [appsInMaintenance, setAppsInMaintenance] = useState([])
  const registry = new Registry({
    client
  })

  useEffect(() => {
    const fetchData = async () => {
      const newAppsInMaintenance = await registry.fetchAppsInMaintenance()
      if (newAppsInMaintenance.length !== appsInMaintenance.length)
        setAppsInMaintenance(newAppsInMaintenance)
    }
    fetchData()
  })

  return appsInMaintenance
}

export default useAppsInMaintenance
