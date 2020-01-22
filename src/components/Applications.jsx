import React, { PureComponent } from 'react'

import { Query, Q } from 'cozy-client'
import { translate } from 'cozy-ui/react/I18n'
import flag from 'cozy-flags'

import AppTile from 'components/AppTile'
import LoadingPlaceholder from 'components/LoadingPlaceholder'
import homeConfig from 'config/collect'

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
    return (
      <div className="app-list">
        <Query query={() => Q('io.cozy.apps')} as="apps">
          {({ data, fetchStatus }) => {
            return fetchStatus !== 'loaded' ? (
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
            )
          }}
        </Query>
      </div>
    )
  }
}

export default translate()(Applications)
