import React, { Component } from 'react'

import EmptyIcon from '../assets/images/connected-accounts.svg'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getInstalledKonnectors } from '../reducers'
import { translate } from 'cozy-ui/react/I18n'
import sortBy from 'lodash/sortBy'
import { withBreakpoints } from 'cozy-ui/react'

import KonnectorTile from './KonnectorTile'
import AddServiceTile from './AddServiceTile'

class Services extends Component {
  render() {
    const { breakpoints, t, installedKonnectors } = this.props
    const hasConnections = !!installedKonnectors.length
    return (
      <div className="col-services">
        <h2 className="col-view-title">{t('services.title')}</h2>
        {hasConnections ? (
          <div className="connector-list" data-tutorial="home-services">
            {breakpoints.isMobile && (
              <AddServiceTile label={t('add_service')} />
            )}
            {installedKonnectors.map(konnector => (
              <KonnectorTile
                konnector={konnector}
                route={`connected/${konnector.slug}`}
              />
            ))}
            {!breakpoints.isMobile && (
              <AddServiceTile label={t('add_service')} />
            )}
          </div>
        ) : (
          <div className="connector-list col-picture-for-empty-list">
            <img
              src={EmptyIcon}
              className="col-picture-for-empty-list--img"
              data-tutorial="home-services"
              alt={t('connector.empty')}
            />
            <div className="col-picture-for-empty-list--text">
              <h2>{t('connector.no-connectors-connected')}</h2>
              <p>{t('connector.get-info')}</p>
              <NavLink to="/providers/all" className="col-button">
                <span>{t('connector.connect-account')}</span>
              </NavLink>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    installedKonnectors: sortBy(
      getInstalledKonnectors(state),
      konnector => konnector.name
    )
  }
}

export default connect(mapStateToProps)(
  translate()(withBreakpoints()(Services))
)
