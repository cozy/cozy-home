import React, { Component } from 'react'

import Icon from 'cozy-ui/react/Icon'
import { connect } from 'react-redux'
import { Route, NavLink } from 'react-router-dom'
import { getConnections } from '../reducers'
import { translate } from 'cozy-ui/react/I18n'
import { Button } from 'cozy-ui/react/Button'
import { isTutorial, display as displayTutorial } from '../lib/tutorial'

import TriggerTile from './TriggerTile'

import addAccountIcon from '../assets/icons/icon-plus.svg'
import pictureForEmtpyList from '../assets/images/connected-accounts.svg'
import ConnectionManagement from '../containers/ConnectionManagement'

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
    const { t, connections } = this.props
    return (
      <div className="content">
        <div className="col-top-bar" data-tutorial="top-bar">
          <h1 className="col-top-bar-title">{t('nav.connected')}</h1>
          {connections.length > 0 && (
            <NavLink to="/providers/all">
              <Button>
                <Icon icon={addAccountIcon} className="col-icon--add" />{' '}
                {t('add_account')}
              </Button>
            </NavLink>
          )}
        </div>
        {connections.length ? (
          <div className="connector-list">
            {connections.map(connection => (
              <TriggerTile
                konnector={connection.konnector}
                trigger={connection.trigger}
                account={connection.account}
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
              <NavLink to="/providers/all">
                <Button>{t('connector.connect-account')}</Button>
              </NavLink>
            </div>
          </div>
        )}
        <Route
          path="/connected/:konnectorSlug/:accountId"
          render={props => (
            <ConnectionManagement originPath="/connected" {...props} />
          )}
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
