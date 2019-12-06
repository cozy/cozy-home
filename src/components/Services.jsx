import React from 'react'
import PropTypes from 'prop-types'
import sortBy from 'lodash/sortBy'
import { connect } from 'react-redux'
import { withClient } from 'cozy-client'
import { queryConnect } from 'cozy-client'
import { translate } from 'cozy-ui/react/I18n'
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

export const Services = ({
  t,
  installedKonnectors,
  suggestedKonnectorsQuery,
  client
}) => {
  const appsInMaintenance = useAppsInMaintenance(client)
  const appsInMaintenanceBySlug = keyBy(appsInMaintenance, 'slug')

  const candidatesSlugBlacklist = appsInMaintenance
    .map(({ slug }) => slug)
    .concat(installedKonnectors.map(({ slug }) => slug))

  const suggestedKonnectors = suggestedKonnectorsQuery.data.filter(
    ({ slug }) => !candidatesSlugBlacklist.includes(slug)
  )
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
    <>
      <div className={'services-list'}>
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
    </>
  )
}

Services.propTypes = {
  t: PropTypes.func.isRequired,
  installedKonnectors: PropTypes.arrayOf(
    PropTypes.shape({ slug: PropTypes.string })
  ).isRequired,
  suggestedKonnectorsQuery: PropTypes.shape({
    data: PropTypes.array.isRequired
  }).isRequired,
  client: PropTypes.object.isRequired
}

const query = client =>
  client
    .find('io.cozy.apps.suggestions')
    .where({ silenced: false })
    .sortBy([{ silenced: 'asc' }, { slug: 'asc' }])
    .indexFields(['silenced', 'slug'])

const mapStateToProps = state => {
  return {
    installedKonnectors: sortBy(getInstalledKonnectors(state), konnector =>
      konnector.name.toLowerCase()
    )
  }
}

export default flow(
  connect(mapStateToProps),
  translate(),
  queryConnect({ suggestedKonnectorsQuery: { query } }),
  withClient
)(Services)
