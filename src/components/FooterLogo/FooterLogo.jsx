import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import { withClient } from 'cozy-client'

const fetchHomeLogos = async client => {
  try {
    const rootURL = client.getStackClient().uri
    const context = await client
      .getStackClient()
      .fetchJSON('GET', '/settings/context')
    const logos = get(context, 'data.attributes.home_logos', {})

    return Object.keys(logos).reduce((acc, logoSrc) => {
      acc[`${rootURL}/assets${logoSrc}`] = logos[logoSrc]
      return acc
    }, {})
  } catch (error) {
    return {}
  }
}

export const FooterLogo = ({ client }) => {
  const [logos, setLogos] = useState([])

  useEffect(() => {
    const fetch = async () => {
      const logos = await fetchHomeLogos(client)
      setLogos(logos)
    }
    fetch()
  }, [])

  if (Object.keys(logos).length === 0) return null

  return (
    <div className="u-maw-7 u-mh-auto u-mt-1 u-pv-1 u-flex u-flex-row u-flex-items-center u-flex-justify-center u-flex-wrap">
      {Object.entries(logos).map(([logoSrc, logoAlt]) => (
        <img
          key={logoSrc}
          src={logoSrc}
          alt={logoAlt}
          className="u-ph-1 u-pv-half u-mah-5"
        />
      ))}
    </div>
  )
}

PropTypes.propTypes = {
  client: PropTypes.object
}

export default withClient(FooterLogo)
