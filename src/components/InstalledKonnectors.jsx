import React, { Component } from 'react'

import Empty from 'cozy-ui/react/Empty'
import EmptyIcon from '../assets/icons/connected-accounts.svg'
import { connect } from 'react-redux'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { getInstalledKonnectors } from '../reducers'
import { translate } from 'cozy-ui/react/I18n'
import { isTutorial, display as displayTutorial } from '../lib/tutorial'
import sortBy from 'lodash/sortBy'

import ConnectionManagement from '../containers/ConnectionManagement'
import KonnectorTile from './KonnectorTile'
import ScrollToTopOnMount from './ScrollToTopOnMount'
import AccountPicker from './AccountPicker'
import StoreButton from './StoreButton'

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
    const { t, installedKonnectors, wrapper } = this.props
    const hasConnections = !!installedKonnectors.length

    return (
      <div className="content">
        <ScrollToTopOnMount target={wrapper} />
        <div className="col-top-bar" data-tutorial="top-bar">
          <h1 className="col-top-bar-title">{t('nav.connected')}</h1>
          {hasConnections && <StoreButton label={t('add_account')} icon />}
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
          <Empty
            icon={EmptyIcon}
            title={t('connector.no-connectors-connected')}
            text={t('connector.get-info')}
          >
            <StoreButton label={t('connector.connect-account')} />
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
    installedKonnectors: sortBy(
      getInstalledKonnectors(state),
      konnector => konnector.name
    )
  }
}

export default withRouter(
  connect(mapStateToProps)(translate()(InstalledKonnectors))
)
