import { useClient } from 'cozy-client'
import { useState, useEffect } from 'react'
import { fetchAllKonnectors } from '../queries/konnectors'

export const useKonnectorsByCat = (): Record<string, unknown> => {
  const client = useClient()
  const [groupedData, setGroupedData] = useState({})

  useEffect(() => {
    if (!client) return

    const fetchData = async (): Promise<void> => {
      const grouped = await fetchAllKonnectors(client)
      setGroupedData(grouped)
    }

    void fetchData()
  }, [client])

  return groupedData
}
