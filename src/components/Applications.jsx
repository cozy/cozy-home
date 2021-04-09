import React, { memo, useEffect } from 'react'
import { connect } from 'react-redux'

import { useQuery } from 'cozy-client'
import flag from 'cozy-flags'

import AppTile from 'components/AppTile'
import LogoutTile from 'components/LogoutTile'
import ShortcutTile from 'components/ShortcutTile'
import LoadingPlaceholder from 'components/LoadingPlaceholder'
import homeConfig from 'config/home.json'
import { receiveApps } from 'ducks/apps'
import useHomeShortcuts from 'hooks/useHomeShortcuts'
import { appsConn } from 'queries'

const LoadingAppTiles = memo(({ num }) => {
  const tiles = []
  for (let i = 0; i < num; i++) {
    tiles.push(
      <div className="item-wrapper" key={i}>
        <header className="item-header">
          <div className="item-icon">
            <LoadingPlaceholder />
          </div>
        </header>
        <h3 className="item-title">
          <LoadingPlaceholder />
        </h3>
      </div>
    )
  }
  return <>{tiles}</>
})
LoadingAppTiles.displayName = LoadingAppTiles

export const Applications = memo(({ receiveApps }) => {
  const showLogout = !!flag('home.mainlist.show-logout')
  const shortcuts = useHomeShortcuts()
  const { data, fetchStatus, lastUpdate } = useQuery(appsConn.query, appsConn)

  // TODO remove this
  useEffect(() => {
    if (fetchStatus === 'loaded') {
      receiveApps(data)
    }
  }, [data, fetchStatus, lastUpdate, receiveApps])
  return (
    <div className="app-list">
      {fetchStatus !== 'loaded' ? (
        <LoadingAppTiles num="3" />
      ) : (
        data
          .filter(
            app =>
              app.state !== 'hidden' &&
              !homeConfig.filteredApps.includes(app.slug) &&
              !flag(`home_hidden_apps.${app.slug.toLowerCase()}`) // can be set in the context with `home_hidden_apps: - drive - banks`for example
          )
          .map((app, index) => <AppTile key={index} app={app} />)
      )}
      {shortcuts.map((shortcut, index) => (
        <ShortcutTile key={index} file={shortcut} />
      ))}
      {showLogout && <LogoutTile />}
    </div>
  )
})
Applications.displayName = 'Applications'

const mapDispatchToProps = dispatch => {
  return {
    receiveApps: apps => dispatch(receiveApps(apps))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Applications)
