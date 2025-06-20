import React, { useMemo } from 'react'
import sortBy from 'lodash/sortBy'
import { useAppsInMaintenance, useQuery } from 'cozy-client'
import { useSelector } from 'react-redux'
import cx from 'classnames'

import keyBy from 'lodash/keyBy'
import has from 'lodash/has'

import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import AddServiceTile from '@/components/AddServiceTile'
import KonnectorTile from '@/components/KonnectorTile'

import {
  fetchRunningKonnectors,
  getRunningKonnectors
} from '@/lib/konnectors_typed'

import { getInstalledKonnectors } from '../selectors/konnectors'

export const useServices = () => {
  const appsAndKonnectorsInMaintenance = useAppsInMaintenance()
  const appsAndKonnectorsInMaintenanceBySlug = keyBy(
    appsAndKonnectorsInMaintenance,
    'slug'
  )
  const konnectors = useSelector(getInstalledKonnectors) || []
  const installedKonnectors = sortBy(konnectors, konnector =>
    konnector.name.toLowerCase()
  )

  const { data: jobData } = useQuery(
    fetchRunningKonnectors.definition,
    fetchRunningKonnectors.options
  )

  const runningKonnectors = useMemo(
    () => getRunningKonnectors(jobData),
    [jobData]
  )

  const konnectorsToShow = installedKonnectors.map(konnector => (
    <KonnectorTile
      key={konnector.id}
      konnector={konnector}
      isInMaintenance={has(
        appsAndKonnectorsInMaintenanceBySlug,
        konnector.slug
      )}
      loading={runningKonnectors.includes(konnector.slug)}
    />
  ))

  return {
    konnectors: konnectorsToShow
  }
}

export const Services = () => {
  const { t } = useI18n()

  const { konnectors } = useServices()

  return (
    <div className="services-list-wrapper u-m-auto u-w-100">
      <div
        className={cx(
          'services-list services-list--gutter u-w-100 u-mh-auto u-mv-3 u-mv-2-t u-flex-justify-center'
        )}
      >
        {konnectors}
        {<AddServiceTile label={t('add_service')} />}
      </div>
    </div>
  )
}

export default Services
