import React from 'react'

import AppTile from './AppTile'
import LoadingPlaceholder from './LoadingPlaceholder'
import fillWithGhostItems from './helpers/fillWithGhostItems'
import { Query } from 'cozy-client'
import { translate } from 'cozy-ui/react/I18n'

const LoadingAppTiles = ({ num }) => {
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

export const Applications = () => {
  const ignoredAppSlugs = ['home', 'onboarding', 'settings']
  return (
    <div className="app-list-wrapper">
      <Query
        query={client => {
          return client.all('io.cozy.apps')
        }}
      >
        {({ data, fetchStatus }) => {
          return fetchStatus !== 'loaded' ? (
            <LoadingAppTiles num="3" />
          ) : (
            <div className="list app-list" data-tutorial="home-apps">
              {data
                .filter(
                  app =>
                    app.state !== 'hidden' &&
                    !ignoredAppSlugs.includes(app.slug)
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

export default translate()(Applications)
