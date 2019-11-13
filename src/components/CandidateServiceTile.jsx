import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'cozy-ui/react/I18n'
import AppLinker, { generateWebLink } from 'cozy-ui/react/AppLinker'
import { withClient } from 'cozy-client'
import AppIcon from 'components/AppIcon'

const CandidateServiceTile = ({ t, slug, name, client }) => {
  const cozyURL = new URL(client.getStackClient().uri)
  const app = 'store'
  const nativePath = `/discover/${slug}`

  return (
    <AppLinker
      slug={app}
      nativePath={nativePath}
      href={generateWebLink({
        cozyUrl: cozyURL.origin,
        slug: app,
        nativePath: nativePath
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

CandidateServiceTile.propTypes = {
  slug: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  client: PropTypes.object.isRequired
}

export default translate()(withClient(CandidateServiceTile))
