/* global cozy */
import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { getInstalledKonnectors } from 'reducers'

const IntentRedirect = ({ installedKonnectors, location }) => {
  const queryString = !!location && location.search
  const query =
    queryString &&
    queryString
      .substring(1)
      .split('&')
      .reduce((accumulator, keyValue) => {
        const splitted = keyValue.split('=')
        accumulator[splitted[0]] = splitted[1] || true
        return accumulator
      }, {})

  if (!query.konnector) {
    return <Redirect to={`/connected`} />
  }

  if (
    !installedKonnectors.find(konnector => konnector.slug === query.konnector)
  ) {
    return cozy.client.intents.redirect('io.cozy.apps', {
      slug: query.konnector
    })
  }

  let redirectRoute = `/connected/${query.konnector}`

  if (query.account) {
    redirectRoute = `${redirectRoute}/accounts/${query.account}`
  }

  return <Redirect to={redirectRoute} />
}

const mapStateToProps = state => ({
  installedKonnectors: getInstalledKonnectors(state)
})

export default connect(mapStateToProps)(IntentRedirect)
