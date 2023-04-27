import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'

import { models, useClient } from 'cozy-client'
import AppLinker from 'cozy-ui/transpiled/react/AppLinker'
import SquareAppIcon from 'cozy-ui/transpiled/react/SquareAppIcon'

import { fetchAppInfo } from 'queries'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

const { applications } = models

// AppTileWrapper is responsible for fetching the app's information
// if the app state changes from 'installing' to 'ready'
const AppTileWrapper = ({ app, lang }) => {
  const client = useClient()
  const [appInfo, setAppInfo] = useState(app.state === 'ready' ? app : null)
  const prevState = useRef(app.state)
  const { t } = useI18n()

  // If app state changes from 'installing' to 'ready', fetch app info
  useEffect(() => {
    const loadAppInfo = async () => {
      const fetchedAppInfo = await fetchAppInfo(app._id, client)
      setAppInfo(fetchedAppInfo)
    }

    if (prevState.current === 'installing' && app.state === 'ready') {
      prevState.current = app.state
      loadAppInfo()
    }
  }, [app, app.state, client])

  // Show loading icon if app information is not available, otherwise render AppTile
  return !appInfo ? (
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
    <AppTile app={appInfo} lang={lang} />
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
