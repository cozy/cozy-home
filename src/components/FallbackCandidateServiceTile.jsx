import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import AppLinker, { generateWebLink } from 'cozy-ui/transpiled/react/AppLinker'
import { useClient } from 'cozy-client'
import AppIcon from 'cozy-ui/transpiled/react/AppIcon'
import useRegistryInformation from 'hooks/useRegistryInformation'

const FallbackCandidateServiceTile = ({ t, slug }) => {
  const client = useClient()
  const cozyURL = new URL(client.getStackClient().uri)
  const app = 'store'
  const nativePath = `/discover/${slug}`
  const { cozySubdomainType: subDomainType } = client.getInstanceOptions()
  const registryData = useRegistryInformation(client, slug)
  const name = registryData
    ? get(registryData, 'latest_version.manifest.name', slug)
    : ''

  return (
    <AppLinker
      slug={app}
      nativePath={nativePath}
      href={generateWebLink({
        cozyUrl: cozyURL.origin,
        slug: app,
        nativePath,
        subDomainType
      })}
    >
      {({ onClick, href }) => (
        <a onClick={onClick} href={href} className="item item--ghost">
          <div className="item-icon">
            <AppIcon alt={t('app.logo.alt', { name })} app={slug} />
          </div>
          <span className="item-title">{name}</span>
        </a>
      )}
    </AppLinker>
  )
}

FallbackCandidateServiceTile.propTypes = {
  slug: PropTypes.string.isRequired
}

export default translate()(FallbackCandidateServiceTile)
