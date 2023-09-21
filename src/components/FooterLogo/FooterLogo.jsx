import React from 'react'
import { useClient, useQuery } from 'cozy-client'
import { buildContextQuery } from 'queries'
import Divider from 'cozy-ui/transpiled/react/Divider'

import { getHomeLogos } from 'components/FooterLogo/helpers'

export const FooterLogo = () => {
  const client = useClient()
  const rootURL = client.getStackClient().uri

  const contextQuery = buildContextQuery()
  const { data } = useQuery(contextQuery.definition, contextQuery.options)

  const logos = getHomeLogos(data, rootURL)

  const hasSecondaries =
    logos.secondaries && Object.keys(logos.secondaries).length !== 0
  const hasMain = logos.main !== undefined

  if (!hasMain && !hasSecondaries) return null

  return (
    <footer className="u-mt-auto">
      <Divider />
      <div className="u-flex">
        <div className="u-flex u-mh-auto u-maw-100 u-flex-items-center">
          {hasMain ? (
            <img
              key={logos.main.url}
              src={logos.main.url}
              alt={logos.main.alt}
              className="u-ph-1 u-pv-1 u-mah-3"
            />
          ) : null}
          {hasMain && hasSecondaries ? (
            <div style={{ height: '50%' }}>
              <Divider orientation="vertical" />
            </div>
          ) : null}
          {hasSecondaries ? (
            <div className="u-flex u-flex-grow-1 u-ov-auto u-filter-gray-100 u-pv-1">
              {Object.entries(logos.secondaries).map(([logoSrc, logoAlt]) => (
                <img
                  key={logoSrc}
                  src={logoSrc}
                  alt={logoAlt}
                  className="u-ph-1 u-mah-3"
                  style={{
                    objectFit: 'contain'
                  }}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  )
}

export default FooterLogo
