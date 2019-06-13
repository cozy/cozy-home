import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { translate } from 'cozy-ui/react/I18n'
import AppIcon from 'cozy-ui/react/AppIcon'
import AppLinker from 'cozy-ui/react/AppLinker'

export class AppTile extends Component {
  render() {
    const { app, t } = this.props
    const { domain, secure } = this.context
    const displayName = app.name_prefix
      ? `${app.name_prefix} ${app.name}`
      : app.name
    const appHref = app.links && app.links.related
    return (
      <AppLinker slug={app.slug} href={appHref}>
        {({ onClick, href }) => (
          <a onClick={onClick} href={href} className="item-wrapper">
            <div className="item-icon">
              <AppIcon
                alt={t('app.logo.alt', { name: displayName })}
                app={app}
                domain={domain}
                secure={secure}
              />
            </div>
            <h3 className="item-title">{displayName}</h3>
          </a>
        )}
      </AppLinker>
    )
  }
}

AppTile.contextTypes = {
  domain: PropTypes.string.isRequired,
  secure: PropTypes.bool
}

export default translate()(AppTile)
