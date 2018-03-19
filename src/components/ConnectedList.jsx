import React, { Component } from 'react'

import Icon from 'cozy-ui/react/Icon'
import { connect } from 'react-redux'
import { Route, NavLink } from 'react-router-dom'
import { getConnections } from '../reducers'
import { translate } from 'cozy-ui/react/I18n'
import { isTutorial, display as displayTutorial } from '../lib/tutorial'

import TriggerTile from './TriggerTile'
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
    const { base, t, connections, wrapper } = this.props
    return (
      <div className="content">
        <ScrollToTopOnMount target={wrapper} />
        <div className="col-top-bar" data-tutorial="top-bar">
          <h1 className="col-top-bar-title">{t('nav.connected')}</h1>
          {connections.length > 0 && (
            <NavLink to="/providers/all" className="col-button">
              <Icon icon={addAccountIcon} className="col-icon--add" />&nbsp;
              {t('add_account')}
            </NavLink>
          )}
        </div>
        {connections.length ? (
          <div className="connector-list">
            {connections.map(({ account, konnector, trigger }) => (
              <TriggerTile
                konnector={konnector}
                trigger={trigger}
                account={account}
                route={`${base}/${konnector.slug}`}
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
                {t('connector.connect-account')}
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
    connections: getConnections(state)
  }
}

export default connect(mapStateToProps)(translate()(ConnectedList))
