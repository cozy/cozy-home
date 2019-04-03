import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { Query } from 'cozy-client'
import { translate } from 'cozy-ui/react/I18n'

import AppTile from 'components/AppTile'
import LoadingPlaceholder from 'components/LoadingPlaceholder'
import fillWithGhostItems from 'components/helpers/fillWithGhostItems'
import homeConfig from 'config/collect'
import { receiveApps } from 'ducks/apps'

class LoadingAppTiles extends PureComponent {
  render() {
    const { num } = this.props
    const tiles = []
    for (let i = 0; i < num; i++) {
      tiles.push(
        <div className="item-wrapper">
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
    return (
      <div className="list app-list">
        {tiles}
        {fillWithGhostItems(6)}
      </div>
    )
  }
}

export class Applications extends PureComponent {
  render() {
    const { receiveApps } = this.props
    return (
      <div className="app-list-wrapper">
        <Query
          query={client => {
            return client.all('io.cozy.apps')
          }}
        >
          {({ data, fetchStatus }) => {
            if (fetchStatus === 'loaded') {
              receiveApps(data)
            }
            return fetchStatus !== 'loaded' ? (
              <LoadingAppTiles num="3" />
            ) : (
              <div className="list app-list" data-tutorial="home-apps">
                {data
                  .filter(
                    app =>
                      app.state !== 'hidden' &&
                      !homeConfig.filteredApps.includes(app.slug)
                  )
                  .map((app, index) => (
                    <AppTile key={index} app={app} />
                  ))}
                {fillWithGhostItems(6)}
              </div>
            )
          }}
        </Query>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    receiveApps: apps => dispatch(receiveApps(apps))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(translate()(Applications))
