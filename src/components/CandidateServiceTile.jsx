import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'cozy-ui/react/I18n'
import AppIcon from 'cozy-ui/react/AppIcon'

class CandidateServiceTile extends React.Component {
  render() {
    const { t, slug, label } = this.props
    const { domain, secure } = this.context
    return (
      <div className="item item--ghost">
        <div className="item-icon">
          <AppIcon
            alt={t('app.logo.alt', { name: label })}
            app={slug}
            domain={domain}
            secure={secure}
          />
        </div>
        <span className="item-title">{label}</span>
      </div>
    )
  }
}

CandidateServiceTile.contextTypes = {
  slug: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  domain: PropTypes.string.isRequired,
  secure: PropTypes.bool
}

export default translate()(CandidateServiceTile)
