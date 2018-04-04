import React, { Component } from 'react'

import { ButtonLink } from 'cozy-ui/react/Button'
import Icon from 'cozy-ui/react/Icon'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { getInstalledKonnectors } from '../reducers'
import { getAppUrl } from '../ducks/apps'
import { translate } from 'cozy-ui/react/I18n'
import { isTutorial, display as displayTutorial } from '../lib/tutorial'
import sortBy from 'lodash/sortBy'

import KonnectorTile from './KonnectorTile'
import ScrollToTopOnMount from './ScrollToTopOnMount'
import AccountPicker from './AccountPicker'

import addAccountIcon from '../assets/icons/icon-plus.svg'
import pictureForEmtpyList from '../assets/images/connected-accounts.svg'

const ButtonLinkToStore = ({ icon, label, cozyStoreURL }) => (
  <ButtonLink disabled={!cozyStoreURL} href={cozyStoreURL}>
    {icon && <Icon icon={addAccountIcon} className="col-icon--add" />}
    {label}
  </ButtonLink>
)

class InstalledKonnectors extends Component {
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
    const { t, installedKonnectors, cozyStoreURL, wrapper } = this.props
    const hasConnections = !!installedKonnectors.length
    return (
      <div className="content">
        <ScrollToTopOnMount target={wrapper} />
        <div className="col-top-bar" data-tutorial="top-bar">
          <h1 className="col-top-bar-title">{t('nav.connected')}</h1>
          {hasConnections && (
            <ButtonLinkToStore
              icon={addAccountIcon}
              label={t('add_account')}
              cozyStoreURL={cozyStoreURL}
            />
          )}
        </div>
        {hasConnections ? (
          <div className="connector-list">
            {installedKonnectors.map(konnector => (
              <KonnectorTile
                konnector={konnector}
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
              <ButtonLinkToStore
                href={cozyStoreURL}
                label={t('connector.connect-account')}
              />
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
    installedKonnectors: sortBy(
      getInstalledKonnectors(state),
      konnector => konnector.name
    ),
    cozyStoreURL: getAppUrl(state.cozy, 'store')
  }
}

export default connect(mapStateToProps)(translate()(InstalledKonnectors))
