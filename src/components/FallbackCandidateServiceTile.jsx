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

  /**
   * If there is no registry data it is better to render nothing because we won't have any link to the Konnector, despite having its slug.
   * This is because failing to get the data most likely means that the Service is not available on the current registry (404 Not Found).
   *
   * It is not a problem if the Service is not available on the registry, but it is a problem if we try to link to it.
   * Here it would display an AppLinker with a grey cube, an unformatted slug as a name and no working link.
   */
  return registryData ? (
    <AppLinker
      app={{ slug: app }}
      nativePath={nativePath}
      href={generateWebLink({
        pathname: '/',
        cozyUrl: cozyURL.origin,
        slug: app,
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
  ) : null
}

FallbackCandidateServiceTile.propTypes = {
  slug: PropTypes.string.isRequired
}

export default FallbackCandidateServiceTile
