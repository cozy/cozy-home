import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'cozy-ui/react/I18n'
import IconGrid from 'cozy-ui/react/Labs/IconGrid'
import AppLinker, { generateWebLink } from 'cozy-ui/react/AppLinker'
import { withClient } from 'cozy-client'
import AppIcon from 'components/AppIcon'

const CandidateCategoryTile = ({ t, slugs, category, client }) => {
  const cozyURL = new URL(client.getStackClient().uri)
  const app = 'store'
  const nativePath = `/discover?type=konnector&category=${category}`
  const { cozySubdomainType: subDomainType } = client.getInstanceOptions()

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
            <IconGrid>
              {slugs.map(slug => (
                <AppIcon
                  alt={t('app.logo.alt', { name: category })}
                  app={slug}
                  key={slug}
                  className="item-grid-icon"
                />
              ))}
            </IconGrid>
          </div>
          <span className="item-title">{t(`category.${category}`)}</span>
        </a>
      )}
    </AppLinker>
  )
}

CandidateCategoryTile.propTypes = {
  slugs: PropTypes.arrayOf(PropTypes.string).isRequired,
  category: PropTypes.string.isRequired,
  client: PropTypes.object.isRequired
}

export default translate()(withClient(CandidateCategoryTile))
