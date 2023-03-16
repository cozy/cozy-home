import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import AppLinker from 'cozy-ui/transpiled/react/AppLinker'
import { useClient, generateWebLink } from 'cozy-client'
import useRegistryInformation from 'hooks/useRegistryInformation'
import SquareAppIcon from 'cozy-ui/transpiled/react/SquareAppIcon'

const FallbackCandidateServiceTile = ({ slug }) => {
  const client = useClient()
  const cozyURL = new URL(client.getStackClient().uri)
  const app = 'store'
  const nativePath = `/discover/${slug}`
  const { subdomain: subDomainType } = client.getInstanceOptions()
  const registryData = useRegistryInformation(client, slug)
  const name = registryData
    ? get(registryData, 'latest_version.manifest.name', slug)
    : ''

  return (
    <AppLinker
      app={{ slug: app }}
      nativePath={nativePath}
      href={generateWebLink({
        cozyUrl: cozyURL.origin,
        slug: app,
        pathname: '/',
        hash: nativePath,
        subDomainType
      })}
    >
      {({ onClick, href }) => (
        <a onClick={onClick} href={href} className="scale-hover">
          <SquareAppIcon
            app={slug}
            type="konnector"
            name={name}
            variant="ghost"
          />
        </a>
      )}
    </AppLinker>
  )
}

FallbackCandidateServiceTile.propTypes = {
  slug: PropTypes.string.isRequired
}

export default FallbackCandidateServiceTile
