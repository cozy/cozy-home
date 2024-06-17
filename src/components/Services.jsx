import React, { useMemo } from 'react'
import sortBy from 'lodash/sortBy'
import { useAppsInMaintenance, useQuery } from 'cozy-client'
import { useSelector } from 'react-redux'

import keyBy from 'lodash/keyBy'
import has from 'lodash/has'

import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import Divider from 'cozy-ui/transpiled/react/Divider'

import AddServiceTile from 'components/AddServiceTile'
import KonnectorTile from 'components/KonnectorTile'
import CandidateCategoryTile from 'components/CandidateCategoryTile'
import CandidateServiceTile from 'components/CandidateServiceTile'
import FallbackCandidateServiceTile from 'components/FallbackCandidateServiceTile'
import EmptyServicesListTip from 'components/EmptyServicesListTip'
import candidatesConfig from 'config/candidates'
import { suggestedKonnectorsConn } from 'queries'

import {
  fetchRunningKonnectors,
  getRunningKonnectors
} from 'lib/konnectors_typed'

import { getInstalledKonnectors } from '../selectors/konnectors'
export const Services = () => {
  const { t } = useI18n()
  const appsAndKonnectorsInMaintenance = useAppsInMaintenance()
  const appsAndKonnectorsInMaintenanceBySlug = keyBy(
    appsAndKonnectorsInMaintenance,
    'slug'
  )
  const konnectors = useSelector(getInstalledKonnectors) || []
  const installedKonnectors = sortBy(konnectors, konnector =>
    konnector.name.toLowerCase()
  )
  const suggestedKonnectorsQuery = useQuery(
    suggestedKonnectorsConn.query,
    suggestedKonnectorsConn
  )

  const candidatesSlugBlacklist = appsAndKonnectorsInMaintenance
    .map(({ slug }) => slug)
    .concat(installedKonnectors.map(({ slug }) => slug))

  const suggestedKonnectors = suggestedKonnectorsQuery.data
    ? suggestedKonnectorsQuery.data.filter(
        ({ slug }) => !candidatesSlugBlacklist.includes(slug)
      )
    : []
  const fallbackKonnectorSuggestions = candidatesConfig.konnectors.filter(
    ({ slug }) => !candidatesSlugBlacklist.includes(slug)
  )

  const categorySuggestions = Object.entries(candidatesConfig.categories).map(
    ([category, slugs]) => [
      category,
      slugs.filter(slug => !candidatesSlugBlacklist.includes(slug))
    ]
  )

  const hasZeroInstalledKonnectors = !installedKonnectors.length
  const displayFallbackSuggestions =
    hasZeroInstalledKonnectors && suggestedKonnectors.length === 0
  const displayTutorialTip =
    hasZeroInstalledKonnectors &&
    (suggestedKonnectors.length >= 1 ||
      fallbackKonnectorSuggestions.length >= 1)

  const { data: jobData } = useQuery(
    fetchRunningKonnectors.definition,
    fetchRunningKonnectors.options
  )

  const runningKonnectors = useMemo(
    () => getRunningKonnectors(jobData),
    [jobData]
  )
  return (
    <div className="services-list-wrapper u-m-auto u-w-100">
      <Divider className="u-mv-0" />
      <div className="services-list u-w-100 u-mv-3 u-mv-2-t u-mh-auto u-flex-justify-center">
        {installedKonnectors.map(konnector => (
          <KonnectorTile
            key={konnector.id}
            konnector={konnector}
            isInMaintenance={has(
              appsAndKonnectorsInMaintenanceBySlug,
              konnector.slug
            )}
            loading={runningKonnectors.includes(konnector.slug)}
          />
        ))}
        {suggestedKonnectors.map(suggestion => (
          <CandidateServiceTile key={suggestion.slug} konnector={suggestion} />
        ))}
        {displayFallbackSuggestions &&
          fallbackKonnectorSuggestions.map(candidate => (
            <FallbackCandidateServiceTile
              key={candidate.slug}
              slug={candidate.slug}
            />
          ))}
        {hasZeroInstalledKonnectors &&
          categorySuggestions.map(([category, slugs]) => (
            <CandidateCategoryTile
              key={category}
              slugs={slugs}
              category={category}
            />
          ))}
        {<AddServiceTile label={t('add_service')} />}
      </div>
      {displayTutorialTip && <EmptyServicesListTip />}
    </div>
  )
}

export default Services
