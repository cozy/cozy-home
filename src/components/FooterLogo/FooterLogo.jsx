import React from 'react'
import { useClient, useQuery } from 'cozy-client'
import { buildContextQuery } from 'queries'

import { getHomeLogos } from 'components/FooterLogo/helpers'

export const FooterLogo = () => {
  const client = useClient()
  const rootURL = client.getStackClient().uri

  const contextQuery = buildContextQuery()
  const { data } = useQuery(contextQuery.definition, contextQuery.options)

  const logos = getHomeLogos(data, rootURL)

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

export default FooterLogo
