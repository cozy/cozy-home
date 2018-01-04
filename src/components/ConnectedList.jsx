import React, { Component } from 'react'
import { Link } from 'react-router'

import Icon from 'cozy-ui/react/Icon'
import { connect } from 'react-redux'
import { getConnections } from '../reducers'
import { translate } from 'cozy-ui/react/I18n'
import { isTutorial, display as displayTutorial } from '../lib/tutorial'

import ConnectedTile from './ConnectedTile'

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
    const { t, connections, children } = this.props
    return (
      <div className="content">
        <div className="col-top-bar" data-tutorial="top-bar">
          <h1 className="col-top-bar-title">{t('nav.connected')}</h1>
          {connections.length > 0 && (
            <Link to="/providers/all">
              <button className="coz-btn coz-btn--regular">
                <Icon icon={addAccountIcon} className="col-icon--add" />{' '}
                {t('add_account')}
              </button>
            </Link>
          )}
        </div>
        {connections.length ? (
          <div className="connector-list">
            {connections.map(connection => (
              <ConnectedTile
                konnector={connection.konnector}
                account={connection.account}
                trigger={connection.trigger}
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
              <Link to="/providers/all">
                <button className="coz-btn coz-btn--regular">
                  {t('connector.connect-account')}
                </button>
              </Link>
            </div>
          </div>
        )}
        {children}
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
