import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { models } from 'cozy-client'

import { translate } from 'cozy-ui/transpiled/react/I18n'
import AppLinker from 'cozy-ui/transpiled/react/AppLinker'
import SquareAppIcon from 'cozy-ui/transpiled/react/SquareAppIcon'
const { applications } = models

export class AppTile extends Component {
  render() {
    const { app, lang } = this.props
    const displayName = applications.getAppDisplayName(app, lang)
    const appHref = app.links && app.links.related
    return (
      <AppLinker slug={app.slug} href={appHref} app={app}>
        {({ onClick, href }) => (
          <a onClick={onClick} href={href} className="scale-hover">
            <SquareAppIcon app={app} name={displayName} />
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
