import React, { Component } from 'react'
import { Link } from 'react-router'

import Icon from 'cozy-ui/react/Icon'
import { translate } from 'cozy-ui/react/I18n'
import { isTutorial, display as displayTutorial } from '../lib/tutorial'

import KonnectorList from './KonnectorList'

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
      setTimeout(() => {
        displayTutorial(this.props.t)
      }, 1000)
    }
  }

  render() {
    const { t, connectors, children } = this.props
    return (
      <div className="content">
        <div className="con-top-bar" data-tutorial="con-top-bar">
          <h1 className="con-top-bar-title">{t('nav.connected')}</h1>
          {connectors.length > 0 && (
            <Link to="/providers/all">
              <button className="coz-btn coz-btn--regular">
                <Icon icon={addAccountIcon} className="con-icon--add" />{' '}
                {t('add_account')}
              </button>
            </Link>
          )}
        </div>
        {connectors.length ? (
          <KonnectorList connectors={connectors} />
        ) : (
          <div className="con-picture-for-emtpy-list">
            <img
              src={pictureForEmtpyList}
              className="con-picture-for-emtpy-list--img"
              alt={t('connector.empty')}
            />
            <div data-tutorial="empty-view">
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

export default translate()(ConnectedList)
