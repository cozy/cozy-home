import React, { memo } from 'react'
import memoize from 'lodash/memoize'
import uniqBy from 'lodash/uniqBy'
import { useQuery, useFetchHomeShortcuts, models } from 'cozy-client'

import flag from 'cozy-flags'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import cx from 'classnames'

import AppTile from '@/components/AppTile'
import LogoutTile from '@/components/LogoutTile'
import ShortcutLink from '@/components/ShortcutLink'
import LoadingPlaceholder from '@/components/LoadingPlaceholder'
import AppHighlightAlertWrapper from '@/components/AppHighlightAlert/AppHighlightAlertWrapper'
import homeConfig from '@/config/home.json'
import { appsConn } from '@/queries'

import SquareAppIcon from 'cozy-ui-plus/dist/SquareAppIcon'

const {
  applications: {
    sortApplicationsList,
    selectEntrypoints,
    checkEntrypointCondition
  }
} = models

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

// We get only the entrypoints we want:
// - Drive onlyoffice
const getEntrypoints = apps => {
  const driveApp = apps.find(app => app.slug === 'drive') || {}

  const driveEntrypoints = driveApp.entrypoints || []

  const selectedEntrypoints = selectEntrypoints(driveEntrypoints, [
    'new-file-type-text',
    'new-file-type-sheet',
    'new-file-type-slide'
  ])

  // Custom filtering because we want to ignore flag related to top bar
  const filteredEntrypoints = selectedEntrypoints.filter(entrypoint => {
    const conditions = entrypoint.conditions || []

    return conditions.every(condition => {
      if (
        condition.type === 'flag' &&
        condition.name === 'bar.onlyoffice.enabled'
      ) {
        return true
      }

      return checkEntrypointCondition(condition)
    })
  })

  return filteredEntrypoints.map(entrypoint => ({
    ...entrypoint,
    slug: driveApp.slug
  }))
}

export const useApps = () => {
  const { data: apps } = useQuery(appsConn.query, appsConn)

  const shortcuts = useFetchHomeShortcuts()

  const entrypoints = getEntrypoints(apps)

  return {
    appsComponents: getApplicationsList(apps),
    apps,
    shortcuts,
    entrypoints
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
