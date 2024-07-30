import React from 'react'
import { useClient, useQuery } from 'cozy-client'
import { buildContextQuery } from 'queries'
import Divider from 'cozy-ui/transpiled/react/Divider'
import { useCozyTheme } from 'cozy-ui/transpiled/react/providers/CozyTheme'

export const FooterLogo = () => {
  const client = useClient()
  const { type } = useCozyTheme()
  const rootURL = client.getStackClient().uri

  const contextQuery = buildContextQuery()
  const { data } = useQuery(contextQuery.definition, contextQuery.options)

  const logos = data?.logos?.home?.light || []
  const secondaries = logos.filter(logos => logos.type === 'secondary')
  const main = logos.find(logos => logos.type === 'main')

  const hasSecondaries = secondaries.length !== 0
  const hasMain = main !== undefined

  if (!hasMain && !hasSecondaries) return <div className="u-mt-3-s"></div>

  return (
    <footer>
      <Divider />
      <div className="u-flex">
        <div
          className={`u-flex u-mh-auto u-maw-100 u-flex-items-center home-footer-logo-${type}`}
        >
          {hasMain ? (
            <img
              key={main.src}
              src={`${rootURL}/assets${main.src}`}
              alt={main.alt}
              className={`u-ph-1 u-pv-1 u-mah-3 home-footer-logo-${type}--primary`}
            />
          ) : null}
          {hasMain && hasSecondaries ? (
            <div style={{ height: '50%' }}>
              <Divider orientation="vertical" />
            </div>
          ) : null}
          {hasSecondaries ? (
            <div className="u-flex u-flex-grow-1 u-ov-auto u-filter-gray-100 u-pv-1">
              {secondaries.map(({ src, alt }) => (
                <img
                  key={src}
                  src={`${rootURL}/assets${src}`}
                  alt={alt}
                  className={`u-ph-1 u-mah-3 home-footer-logo-${type}--secondary`}
                  style={{ objectFit: 'contain' }}
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
