import React, { memo } from 'react'
import memoize from 'lodash/memoize'
import uniqBy from 'lodash/uniqBy'
import { useQuery } from 'cozy-client'
import { sortApplicationsList } from 'cozy-client/dist/models/applications'
import flag from 'cozy-flags'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import cx from 'classnames'

import AppTile from '@/components/AppTile'
import LogoutTile from '@/components/LogoutTile'
import ShortcutLink from '@/components/ShortcutLink'
import LoadingPlaceholder from '@/components/LoadingPlaceholder'
import AppHighlightAlertWrapper from '@/components/AppHighlightAlert/AppHighlightAlertWrapper'
import homeConfig from '@/config/home.json'
import { appsConn, mkHomeMagicFolderConn, mkHomeShorcutsConn } from '@/queries'

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

const isValidData = memoize(data => Array.isArray(data) && data.length > 0)

const getApplicationsList = data => {
  if (isValidData(data)) {
    const hiddenApps = flag('apps.hidden') || []
    const hiddenHomeApps = flag('apps.hidden-in-home') || []

    const apps = data.filter(
      app =>
        app.state !== 'hidden' &&
        !homeConfig.filteredApps.includes(app.slug) &&
        !hiddenApps.includes(app.slug.toLowerCase()) &&
        !hiddenHomeApps.includes(app.slug.toLowerCase())
    )
    const dedupapps = uniqBy(apps, 'slug')

    const sortedApps = flag('apps.sort')
      ? sortApplicationsList(dedupapps, flag('apps.sort'))
      : dedupapps

    const appList = sortedApps.map(app => <AppTile key={app.id} app={app} />)

    appList.push(
      <AppHighlightAlertWrapper key="AppHighlightAlertWrapper" apps={apps} />
    )

    return appList
  } else {
    return <LoadingAppTiles num={3} />
  }
}

export const useApps = () => {
  const { data: apps } = useQuery(appsConn.query, appsConn)

  const homeMagicFolderConn = mkHomeMagicFolderConn()

  const magicHomeFolder = useQuery(
    homeMagicFolderConn.query,
    homeMagicFolderConn
  )

  const magicHomeFolderId = magicHomeFolder?.data?.[0]?._id
  const homeShortcutsConn = mkHomeShorcutsConn(magicHomeFolderId)
  const { data: shortcuts } = useQuery(homeShortcutsConn.query, {
    ...homeShortcutsConn,
    enabled: !!magicHomeFolderId
  })

  return {
    appsComponents: getApplicationsList(apps),
    apps,
    shortcuts
  }
}

export const Applications = () => {
  const showLogout = !!flag('home.mainlist.show-logout')
  const { appsComponents, shortcuts } = useApps()

  return (
    <div className="app-list-wrapper u-m-auto u-w-100">
      <div
        className={cx(
          'app-list u-w-100 u-mh-auto u-flex-justify-center app-list--gutter'
        )}
      >
        {appsComponents}

        {shortcuts &&
          shortcuts.map((shortcut, index) => (
            <ShortcutLink key={index} file={shortcut} />
          ))}

        {showLogout && <LogoutTile />}
      </div>
    </div>
  )
}

export default Applications
