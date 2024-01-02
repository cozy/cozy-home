import React, { memo, useEffect, useRef } from 'react'
import memoize from 'lodash/memoize'
import uniqBy from 'lodash/uniqBy'
import { useQuery } from 'cozy-client'
import flag from 'cozy-flags'
import Divider from 'cozy-ui/transpiled/react/Divider'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import AppTile from 'components/AppTile'
import LogoutTile from 'components/LogoutTile'
import ShortcutLink from 'components/ShortcutLink'
import LoadingPlaceholder from 'components/LoadingPlaceholder'
import AppHighlightAlertWrapper from 'components/AppHighlightAlert/AppHighlightAlertWrapper'
import homeConfig from 'config/home.json'
import { appsConn, mkHomeMagicFolderConn, mkHomeShorcutsConn } from 'queries'

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

const getApplicationsList = memoize(data => {
  if (isValidData(data)) {
    const apps = data.filter(
      app =>
        app.state !== 'hidden' &&
        !homeConfig.filteredApps.includes(app.slug) &&
        !flag(`home_hidden_apps.${app.slug.toLowerCase()}`) // can be set in the context with `home_hidden_apps: - drive - banks`for example
    )
    const dedupapps = uniqBy(apps, 'slug')
    const array = dedupapps.map(app => <AppTile key={app.id} app={app} />)

    array.push(
      <AppHighlightAlertWrapper key="AppHighlightAlertWrapper" apps={apps} />
    )

    return array
  } else {
    return <LoadingAppTiles num={3} />
  }
})

export const Applications = ({ onAppsFetched }) => {
  const showLogout = !!flag('home.mainlist.show-logout')
  const { t } = useI18n()

  const { data } = useQuery(appsConn.query, appsConn)

  const homeMagicFolderConn = mkHomeMagicFolderConn(t)
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

  const didLoad = useRef(false)

  useEffect(() => {
    const isReady =
      didLoad.current === false && onAppsFetched && isValidData(data)

    if (isReady) {
      onAppsFetched(data)
      didLoad.current = true
    }
  }, [data, onAppsFetched])

  return (
    <div className="app-list-wrapper u-m-auto u-w-100">
      <Divider className="u-mv-0" />

      <div className="app-list u-w-100 u-mv-3 u-mt-2-t u-mb-1-t u-mh-auto u-flex-justify-center">
        {getApplicationsList(data)}

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
