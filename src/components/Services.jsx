import React from 'react'
import PropTypes from 'prop-types'
import sortBy from 'lodash/sortBy'
import { connect } from 'react-redux'
import { useClient } from 'cozy-client'
import { queryConnect } from 'cozy-client'
import keyBy from 'lodash/keyBy'
import has from 'lodash/has'
import flow from 'lodash/flow'

import AddServiceTile from 'components/AddServiceTile'
import KonnectorTile from 'components/KonnectorTile'
import CandidateCategoryTile from 'components/CandidateCategoryTile'
import CandidateServiceTile from 'components/CandidateServiceTile'
import FallbackCandidateServiceTile from 'components/FallbackCandidateServiceTile'
import EmptyServicesListTip from 'components/EmptyServicesListTip'
import { getInstalledKonnectors } from 'reducers/index'
import useAppsInMaintenance from 'hooks/withAppsInMaintenance'
import candidatesConfig from 'config/candidates'
import { suggestedKonnectorsConn } from 'queries'

import { useI18n } from 'cozy-ui/transpiled/react'
import Divider from 'cozy-ui/transpiled/react/MuiCozyTheme/Divider'
import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme'

export const Services = ({ installedKonnectors, suggestedKonnectorsQuery }) => {
  const { t } = useI18n()
  const client = useClient()
  const appsInMaintenance = useAppsInMaintenance(client)
  const appsInMaintenanceBySlug = keyBy(appsInMaintenance, 'slug')

  const candidatesSlugBlacklist = appsInMaintenance
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
  const categorySuggestions = Object.entries(candidatesConfig.categories)

  const hasZeroInstalledKonnectors = !installedKonnectors.length
  const displayFallbackSuggestions =
    hasZeroInstalledKonnectors && suggestedKonnectors.length === 0
  const displayTutorialTip =
    hasZeroInstalledKonnectors &&
    (suggestedKonnectors.length >= 1 ||
      fallbackKonnectorSuggestions.length >= 1)

  return (
    <div className="services-list-wrapper u-m-auto u-w-100">
      <MuiCozyTheme variant="inverted">
        <Divider className="u-mv-0" />
      </MuiCozyTheme>
      <div className="services-list u-w-100 u-mv-3 u-mh-auto u-flex-justify-center">
        {installedKonnectors.map((konnector, index) => (
          <KonnectorTile
            key={index}
            konnector={konnector}
            route={`connected/${konnector.slug}`}
            isInMaintenance={has(appsInMaintenanceBySlug, konnector.slug)}
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
