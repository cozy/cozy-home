import React, { useEffect, useState } from 'react'

import CreateAccountIntent from 'components/intents/CreateAccountIntent'
import { useClient } from 'cozy-client'
import { fetchKonnectorBySlug } from 'queries'

const IntentService = ({ data, service, appData, onCancel }) => {
  const client = useClient()

  const [konnectorData, setKonnectorData] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      let konnectorReq
      try {
        konnectorReq = await client.query(
          fetchKonnectorBySlug(data.slug).query,
          fetchKonnectorBySlug
        )
      } catch (e) {
        // why an error is throwed?
        console.log('e', e)
      } finally {
        if (service && (!konnectorReq || konnectorReq.data.length === 0)) {
          const installedKonnector = await service.compose(
            'INSTALL',
            'io.cozy.apps',
            data
          )
          console.log('installedKonnector', installedKonnector)
          setKonnectorData(installedKonnector)

          // if installedKonnector is null, it means the installation have been
          // cancelled
          if (!installedKonnector) {
            return service.cancel()
          }
        } else {
          setKonnectorData(konnectorReq.data)
        }
      }
    }
    fetchData()
  }, [])

  if (!konnectorData) {
    return null
  }
  return (
    <div className="coz-service">
      <CreateAccountIntent
        appData={appData}
        konnector={konnectorData}
        onCancel={onCancel}
        onTerminate={service.terminate}
      />
    </div>
  )
}
export default IntentService
