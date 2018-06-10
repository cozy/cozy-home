import React, { Component } from 'react'

import { Icon, Empty } from 'cozy-ui/react'
import EmptyIcon from '../assets/icons/connected-accounts.svg'
import { connect } from 'react-redux'
import { Route, NavLink, Switch, withRouter, Redirect } from 'react-router-dom'
import { getConnectedKonnectors } from '../reducers'
import { translate } from 'cozy-ui/react/I18n'
import { isTutorial, display as displayTutorial } from '../lib/tutorial'
import sortBy from 'lodash/sortBy'

import KonnectorTile from './KonnectorTile'
import ScrollToTopOnMount from './ScrollToTopOnMount'
import AccountPicker from './AccountPicker'
import ConnectionManagement from '../containers/ConnectionManagement'

import addAccountIcon from '../assets/icons/icon-plus.svg'

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
          <Empty
            icon={EmptyIcon}
            title={t('connector.no-connectors-connected')}
            text={t('connector.get-info')}
          >
            <NavLink to="/providers/all" className="col-button">
              <span>{t('connector.connect-account')}</span>
            </NavLink>
          </Empty>
        )}
        <Switch>
          <Route
            exact
            path="/connected/:konnectorSlug"
            component={AccountPicker}
          />
          <Route
            path="/connected/:konnectorSlug/new"
            render={props => (
              <ConnectionManagement
                backRoute={`/connected/${props.match.params.konnectorSlug}`}
                originPath="/connected"
                {...props}
              />
            )}
          />
          <Route
            path="/connected/:konnectorSlug/accounts/:accountId"
            render={props => (
              <ConnectionManagement
                backRoute={`/connected/${props.match.params.konnectorSlug}`}
                originPath="/connected"
                {...props}
              />
            )}
          />
          <Redirect from="/connected/*" to="/connected" />
        </Switch>
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

export default withRouter(connect(mapStateToProps)(translate()(ConnectedList)))
