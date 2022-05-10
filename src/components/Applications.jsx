import React, { memo } from 'react'

import { useQuery } from 'cozy-client'
import flag from 'cozy-flags'
import Divider from 'cozy-ui/transpiled/react/MuiCozyTheme/Divider'
import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme'
import { useI18n } from 'cozy-ui/transpiled/react'

import AppTile from 'components/AppTile'
import LogoutTile from 'components/LogoutTile'
import ShortcutLink from 'components/ShortcutLink'
import LoadingPlaceholder from 'components/LoadingPlaceholder'
import homeConfig from 'config/home.json'
import useHomeShortcuts from 'hooks/useHomeShortcuts'
import { appsConn } from 'queries'

import SquareAppIcon from 'cozy-ui/transpiled/react/SquareAppIcon'

const LoadingAppTiles = memo(({ num }) => {
  const { t } = useI18n()
  return (
    <>
      {Array(num)
        .fill(null)
        .map((e, i) => (
          <div key={i}>
            <SquareAppIcon
              variant="ghost"
              name={t('loading.working')}
              IconContent={<LoadingPlaceholder />}
            />
          </div>
        ))}
    </>
  )
})
LoadingAppTiles.displayName = LoadingAppTiles

const Applications = () => {
  const showLogout = !!flag('home.mainlist.show-logout')
  const shortcuts = useHomeShortcuts()
  const { data, fetchStatus } = useQuery(appsConn.query, appsConn)

  return (
    <div className="app-list-wrapper u-m-auto u-w-100">
      <MuiCozyTheme variant="inverted">
        <Divider className="u-mv-0" />
      </MuiCozyTheme>
      <div className="app-list u-w-100 u-mv-3 u-mv-2-t u-mh-auto u-flex-justify-center">
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
            .map(app => <AppTile key={app.id} app={app} />)
        )}
        {shortcuts.map((shortcut, index) => (
          <ShortcutLink key={index} file={shortcut} />
        ))}
        {showLogout && <LogoutTile />}
      </div>
    </div>
  )
}

export default Applications
