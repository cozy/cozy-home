/* global cozy */
import React from 'react'
import { Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import { getInstalledKonnectors } from '../reducers'

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

  if (query.konnector) {
    if (
      installedKonnectors.find(konnector => konnector.slug === query.konnector)
    ) {
      return <Redirect to={`/connected/${query.konnector}`} />
    } else {
      cozy.client.intents.redirect('io.cozy.apps', { slug: query.konnector })
    }
  }

  return <Redirect to={`/connected`} />
}

const mapStateToProps = state => ({
  installedKonnectors: getInstalledKonnectors(state)
})

export default connect(mapStateToProps)(IntentRedirect)
