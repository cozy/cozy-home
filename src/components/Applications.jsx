import React from 'react'

import AppTile from './AppTile'
import LoadingPlaceholder from './LoadingPlaceholder'
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
  return <div className="app-list">{tiles}</div>
}

export const Applications = props => {
  const { t } = props
  const ignoredAppSlugs = ['home', 'onboarding', 'settings']
  return (
    <div>
      <h2>{t('apps.title')}</h2>
      <Query
        query={client => {
          return client.all('io.cozy.apps')
        }}
      >
        {({ data, fetchStatus }) => {
          return fetchStatus !== 'loaded' ? (
            <LoadingAppTiles num="3" />
          ) : (
            <div className="app-list-wrapper">
              <div className="app-list" data-tutorial="home-apps">
                {data
                  .filter(app => !ignoredAppSlugs.includes(app.slug))
                  .map(app => <AppTile app={app} />)}
              </div>
            </div>
          )
        }}
      </Query>
    </div>
  )
}

export default translate()(Applications)
