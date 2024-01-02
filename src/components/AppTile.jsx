import React from 'react'
import PropTypes from 'prop-types'

import { models } from 'cozy-client'
import AppLinker from 'cozy-ui/transpiled/react/AppLinker'
import SquareAppIcon from 'cozy-ui/transpiled/react/SquareAppIcon'

import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

const { applications } = models

// AppTileWrapper is responsible for fetching the app's information
// if the app state changes from 'installing' to 'ready'
const AppTileWrapper = ({ app }) => {
  const { t, lang } = useI18n()

  // Show loading icon if app information is not available, otherwise render AppTile
  return app.state === 'installing' || app.state === 'upgrading' ? (
    <SquareAppIcon
      app={{
        name: t('apps.installing'),
        slug: '',
        type: 'app'
      }}
      name=""
      variant="loading"
      IconContent={<div />}
    />
  ) : (
    <AppTile app={app} lang={lang} />
  )
}

// AppTile is responsible for rendering the app icon with a link to the app
const AppTile = ({ app, lang }) => {
  const displayName = applications.getAppDisplayName(app, lang)
  const appHref = app?.links?.related || app.links?.related
  const isErrored = app.state === 'errored'

  return (
    <AppLinker href={appHref} app={app}>
      {({ onClick, href, iconRef }) => (
        <a onClick={onClick} href={href} className="scale-hover">
          <SquareAppIcon
            app={app}
            name={displayName}
            iconRef={iconRef}
            variant={isErrored ? 'error' : undefined}
          />
        </a>
      )}
    </AppLinker>
  )
}

AppTile.propTypes = {
  app: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired
}

export default AppTileWrapper
