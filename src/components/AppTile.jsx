import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { translate } from 'cozy-ui/react/I18n'
import AppLinker from 'cozy-ui/react/AppLinker'
import AppIcon from 'components/AppIcon'

export class AppTile extends Component {
  render() {
    const { app, t } = this.props
    const displayName =
      app.name_prefix && app.name_prefix.toLowerCase() !== 'cozy'
        ? `${app.name_prefix} ${app.name}`
        : app.name
    const appHref = app.links && app.links.related
    return (
      <AppLinker slug={app.slug} href={appHref}>
        {({ onClick, href }) => (
          <a onClick={onClick} href={href} className="item">
            <div className="item-icon">
              <AppIcon
                alt={t('app.logo.alt', { name: displayName })}
                app={app}
              />
            </div>
            <h3 className="item-title">{displayName}</h3>
          </a>
        )}
      </AppLinker>
    )
  }
}

AppTile.propTypes = {
  app: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
}

export default translate()(AppTile)
