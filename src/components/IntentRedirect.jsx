import React from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { useClient } from 'cozy-client'
import Intents from 'cozy-interapp'
import { getInstalledKonnectors } from 'reducers'

const IntentRedirect = ({ installedKonnectors }) => {
  const client = useClient()
  const intents = new Intents({ client })
  const [searchParams] = useSearchParams()
  const queryConnector = searchParams.get('konnector')
  const queryAccount = searchParams.get('account')

  if (!queryConnector) return <Navigate to="/connected" />

  if (!installedKonnectors.find(konnector => konnector.slug === queryConnector))
    return intents.redirect('io.cozy.apps', {
      slug: queryConnector
    })

  const redirectRoute = queryAccount
    ? `${redirectRoute}/accounts/${queryAccount}`
    : `/connected/${queryConnector}`

  return <Navigate to={redirectRoute} />
}

const mapStateToProps = state => ({
  installedKonnectors: getInstalledKonnectors(state)
})

export default connect(mapStateToProps)(IntentRedirect)
