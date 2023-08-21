import React, { useEffect } from 'react'

import { useClient } from 'cozy-client'
import { fetchKonnectorBySlug } from 'queries'
import { useNavigate } from 'react-router-dom'

const IntentService = ({ data, service }) => {
  const client = useClient()
  const navigate = useNavigate()

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
          // setKonnectorData(installedKonnector)
          navigate(`/${service.getData().slug}/new`)
          // if installedKonnector is null, it means the installation have been
          // cancelled
          if (!installedKonnector) {
            service.cancel()
          }
        } else {
          // setKonnectorData(konnectorReq.data)

          // setTimeout(() => {
          // console.log('will navigate ?')
          navigate(`/${service.getData().slug}/new`)
          // }, 500)
        }
      }
    }
    fetchData()
  }, [])

  return null
}
export default IntentService
