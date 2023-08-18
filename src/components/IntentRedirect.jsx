import React from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import {
  useClient,
  useQuery,
  isQueryLoading,
  hasQueryBeenLoaded
} from 'cozy-client'
import Intents from 'cozy-interapp'
import { konnectorsConn } from 'queries'
const IntentRedirect = () => {
  const client = useClient()
  const intents = new Intents({ client })
  const [searchParams] = useSearchParams()
  const queryConnector = searchParams.get('konnector')
  const queryAccount = searchParams.get('account')
  const konnectorsDataResult = useQuery(konnectorsConn.query, konnectorsConn)

  if (
    isQueryLoading(konnectorsDataResult) &&
    !hasQueryBeenLoaded(konnectorsDataResult)
  )
    return null

  if (!queryConnector) return <Navigate to="/connected" />

  if (
    !konnectorsDataResult.data.find(
      konnector => konnector.slug === queryConnector
    )
  )
    return intents.redirect('io.cozy.apps', {
      slug: queryConnector
    })

  const redirectRoute = queryAccount
    ? `${redirectRoute}/accounts/${queryAccount}`
    : `/connected/${queryConnector}`

  return <Navigate to={redirectRoute} />
}

export default IntentRedirect
