import React from 'react'
import sortBy from 'lodash/sortBy'
import { connect } from 'react-redux'
import { withClient } from 'cozy-client'
import { translate } from 'cozy-ui/react/I18n'
import keyBy from 'lodash/keyBy'
import has from 'lodash/has'

import AddServiceTile from 'components/AddServiceTile'
import KonnectorTile from 'components/KonnectorTile'
import NoServicesList from 'components/NoServicesList'
import classNames from 'classnames'
import { getInstalledKonnectors } from 'reducers/index'
import useAppsInMaintenance from 'hooks/withAppsInMaintenance'

const Services = ({ t, installedKonnectors, client }) => {
  const hasConnections = !!installedKonnectors.length
  const appsInMaintenance = useAppsInMaintenance(client)
  const appsInMaintenanceBySlug = keyBy(appsInMaintenance, 'slug')

  return hasConnections ? (
    <div
      className={classNames('services-list', {
        'services-list-wrapper--empty': !hasConnections
      })}
      data-tutorial="home-services"
    >
      {installedKonnectors.map((konnector, index) => (
        <KonnectorTile
          key={index}
          konnector={konnector}
          route={`connected/${konnector.slug}`}
          isInMaintenance={has(appsInMaintenanceBySlug, konnector.slug)}
        />
      ))}
      {<AddServiceTile label={t('add_service')} />}
    </div>
  ) : (
    <NoServicesList />
  )
}

const mapStateToProps = state => {
  return {
    installedKonnectors: sortBy(getInstalledKonnectors(state), konnector =>
      konnector.name.toLowerCase()
    )
  }
}

export default connect(mapStateToProps)(translate()(withClient(Services)))
