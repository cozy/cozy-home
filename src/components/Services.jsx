import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import sortBy from 'lodash/sortBy'
import { connect } from 'react-redux'
import { useClient, useAppsInMaintenance, useQuery } from 'cozy-client'
import { queryConnect } from 'cozy-client'
import keyBy from 'lodash/keyBy'
import has from 'lodash/has'
import flow from 'lodash/flow'

import KonnectorErrors from 'components/KonnectorErrors'
import AddServiceTile from 'components/AddServiceTile'
import KonnectorTile from 'components/KonnectorTile'
import CandidateCategoryTile from 'components/CandidateCategoryTile'
import CandidateServiceTile from 'components/CandidateServiceTile'
import FallbackCandidateServiceTile from 'components/FallbackCandidateServiceTile'
import EmptyServicesListTip from 'components/EmptyServicesListTip'
import { getInstalledKonnectors } from 'reducers/index'
import candidatesConfig from 'config/candidates'
import { suggestedKonnectorsConn } from 'queries'

import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import {
  fetchRunningKonnectors,
  getRunningKonnectors
} from 'lib/konnectors_typed'

export const Services = ({ installedKonnectors, suggestedKonnectorsQuery }) => {
  const { t } = useI18n()
  const client = useClient()
  const appsAndKonnectorsInMaintenance = useAppsInMaintenance(client)
  const appsAndKonnectorsInMaintenanceBySlug = keyBy(
    appsAndKonnectorsInMaintenance,
    'slug'
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
      <KonnectorErrors />
      <div className="services-list u-w-100 u-mv-3 u-mv-2-t u-mh-auto u-flex-justify-center">
        {installedKonnectors.map(konnector => (
          <KonnectorTile
            key={konnector.id}
            konnector={konnector}
            route={`connected/${konnector.slug}`}
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

Services.propTypes = {
  installedKonnectors: PropTypes.arrayOf(
    PropTypes.shape({ slug: PropTypes.string })
  ).isRequired,
  suggestedKonnectorsQuery: PropTypes.shape({
    data: PropTypes.array
  }).isRequired
}

const mapStateToProps = state => {
  return {
    installedKonnectors: sortBy(getInstalledKonnectors(state), konnector =>
      konnector.name.toLowerCase()
    )
  }
}

export default flow(
  connect(mapStateToProps),
  queryConnect({ suggestedKonnectorsQuery: suggestedKonnectorsConn })
)(Services)
