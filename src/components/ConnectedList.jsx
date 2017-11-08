import React, { Component } from 'react'
import { Link } from 'react-router'

import Icon from 'cozy-ui/react/Icon'
import { translate } from 'cozy-ui/react/I18n'
import { isTutorial, display as displayTutorial } from '../lib/tutorial'

import KonnectorList from './KonnectorList'

import addAccount from '../assets/icons/icon-plus.svg'
import noKonnectors from '../assets/images/connected-accounts.svg'

class ConnectedList extends Component {
  componentDidMount() {
    this.launchTutorial()
  }

  componentWillReceiveProps() {
    this.launchTutorial()
  }

  launchTutorial() {
    if (isTutorial()) {
      setTimeout(() => {
        displayTutorial(this.props.t)
      }, 1000)
    }
  }

  render() {
    const { t, connectors, children } = this.props
    return (
      <div className="content">
        <div className="con-top-bar">
          <h1 className="con-top-bar-title">{t('nav.connected')}</h1>
          <Link to="/category/all">
            <button
              className="coz-btn coz-btn--regular"
              data-tutorial="add-account"
            >
              <Icon icon={addAccount} className="con-icon--add" />{' '}
              {t('add_account')}
            </button>
          </Link>
        </div>
        {connectors.length ? (
          <KonnectorList connectors={connectors} />
        ) : (
          <div className="con-noKonnectors">
            <img
              src={noKonnectors}
              className="con-noKonnectors--img"
              alt={t('connector.empty')}
            />
          </div>
        )}
        {children}
      </div>
    )
  }
}

export default translate()(ConnectedList)
