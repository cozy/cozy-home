import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { Query } from 'cozy-client'
import { translate } from 'cozy-ui/react/I18n'

import AppTile from 'components/AppTile'
import LoadingPlaceholder from 'components/LoadingPlaceholder'
import homeConfig from 'config/collect'
import { receiveApps } from 'ducks/apps'

class LoadingAppTiles extends PureComponent {
  render() {
    const { num } = this.props
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
  }
}

export class Applications extends PureComponent {
  render() {
    const { receiveApps } = this.props
    return (
      <div className="app-list" data-tutorial="home-apps">
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
              data
                .filter(
                  app =>
                    app.state !== 'hidden' &&
                    !homeConfig.filteredApps.includes(app.slug)
                )
                .map((app, index) => <AppTile key={index} app={app} />)
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
