import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'cozy-ui/react/I18n'
import AppIcon from 'cozy-ui/react/AppIcon'
import IconGrid from 'cozy-ui/react/Labs/IconGrid'

class CandidateCategoryTile extends React.Component {
  render() {
    const { t, slugs, label } = this.props
    const { domain, secure } = this.context
    return (
      <div className="item item--ghost">
        <div className="item-icon">
          <IconGrid>
            {slugs.map(slug => (
              <AppIcon
                alt={t('app.logo.alt', { name: label })}
                app={slug}
                key={slug}
                domain={domain}
                secure={secure}
              />
            ))}
          </IconGrid>
        </div>
        <span className="item-title">{label}</span>
      </div>
    )
  }
}

CandidateCategoryTile.contextTypes = {
  slugs: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string.isRequired,
  domain: PropTypes.string.isRequired,
  secure: PropTypes.bool
}

export default translate()(CandidateCategoryTile)
