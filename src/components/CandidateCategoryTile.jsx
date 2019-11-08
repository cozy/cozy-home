import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'cozy-ui/react/I18n'
import AppIcon from 'cozy-ui/react/AppIcon'
import IconGrid from 'cozy-ui/react/Labs/IconGrid'
import AppLinker, { generateWebLink } from 'cozy-ui/react/AppLinker'
import { withClient } from 'cozy-client'

class CandidateCategoryTile extends React.Component {
  render() {
    const { t, slugs, category, client } = this.props
    const { domain, secure } = this.context
    const cozyURL = new URL(client.getStackClient().uri)
    const app = 'store'
    const nativePath = `/discover?type=konnector&category=${category}`

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
              <IconGrid>
                {slugs.map(slug => (
                  <AppIcon
                    alt={t('app.logo.alt', { name: category })}
                    app={slug}
                    key={slug}
                    domain={domain}
                    secure={secure}
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
}

CandidateCategoryTile.contextTypes = {
  slugs: PropTypes.arrayOf(PropTypes.string).isRequired,
  category: PropTypes.string.isRequired,
  client: PropTypes.object.isRequired,
  domain: PropTypes.string.isRequired,
  secure: PropTypes.bool
}

export default translate()(withClient(CandidateCategoryTile))
