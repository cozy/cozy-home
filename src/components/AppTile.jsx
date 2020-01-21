import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { models } from 'cozy-client'

import { translate } from 'cozy-ui/react/I18n'
import AppLinker from 'cozy-ui/react/AppLinker'
import AppIcon from 'components/AppIcon'
const { applications } = models

export class AppTile extends Component {
  render() {
    const { app, t, lang } = this.props
    const displayName = applications.getAppDisplayName(app, lang)
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
  app: PropTypes.object.isRequired
}

export default translate()(AppTile)
