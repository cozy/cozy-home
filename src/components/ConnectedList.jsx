import React, { Component } from 'react'

import Icon from 'cozy-ui/react/Icon'
import { connect } from 'react-redux'
import { Route, NavLink } from 'react-router-dom'
import { getConnectedKonnectors } from '../reducers'
import { translate } from 'cozy-ui/react/I18n'
import { isTutorial, display as displayTutorial } from '../lib/tutorial'
import sortBy from 'lodash/sortBy'

import KonnectorTile from './KonnectorTile'
import ScrollToTopOnMount from './ScrollToTopOnMount'
import AccountPicker from './AccountPicker'

import addAccountIcon from '../assets/icons/icon-plus.svg'
import pictureForEmtpyList from '../assets/images/connected-accounts.svg'

class ConnectedList extends Component {
  componentDidMount() {
    this.launchTutorial()
  }

  componentWillReceiveProps() {
    this.launchTutorial()
  }

  launchTutorial() {
    if (isTutorial()) {
      window.history.pushState({}, '', `/${window.location.hash}`)
      setTimeout(() => {
        displayTutorial(this.props.t)
      }, 1000)
    }
  }

  render() {
    const { t, connectedKonnectors, wrapper } = this.props
    const hasConnections = !!connectedKonnectors.length
    return (
      <div className="content">
        <ScrollToTopOnMount target={wrapper} />
        <div className="col-top-bar" data-tutorial="top-bar">
          <h1 className="col-top-bar-title">{t('nav.connected')}</h1>
          {hasConnections && (
            <NavLink to="/providers/all" className="col-button">
              <span>
                <Icon icon={addAccountIcon} className="col-icon--add" />&nbsp;
                {t('add_account')}
              </span>
            </NavLink>
          )}
        </div>
        {hasConnections ? (
          <div className="connector-list">
            {connectedKonnectors.map(({ konnector, hasUserError }) => (
              <KonnectorTile
                konnector={konnector}
                markErrored={hasUserError}
                route={`connected/${konnector.slug}`}
              />
            ))}
          </div>
        ) : (
          <div className="col-picture-for-emtpy-list">
            <img
              data-tutorial="empty-view"
              src={pictureForEmtpyList}
              className="col-picture-for-emtpy-list--img"
              alt={t('connector.empty')}
            />
            <div>
              <h2>{t('connector.no-connectors-connected')}</h2>
              <p>{t('connector.get-info')}</p>
              <NavLink to="/providers/all" className="col-button">
                <span>{t('connector.connect-account')}</span>
              </NavLink>
            </div>
          </div>
        )}
        <Route
          path="/connected/:konnectorSlug/"
          render={props => <AccountPicker {...props} />}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    connectedKonnectors: sortBy(
      getConnectedKonnectors(state),
      ({ konnector }) => konnector.name
    )
  }
}

export default connect(mapStateToProps)(translate()(ConnectedList))
