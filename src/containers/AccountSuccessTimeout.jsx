import styles from '../styles/accountConnection'

import React, { Component } from 'react'
import classNames from 'classnames'

import AccountConnectionData from '../components/AccountConnectionData'

class AccountSuccessTimeout extends Component {
  constructor (props, context) {
    super(props, context)
    this.store = this.context.store
  }

  cancel () {
    this.props.onCancel()
  }

  // TODO: use a better helper
  getIcon (konnector) {
    try {
      return require(`assets/icons/konnectors/${konnector.slug}.svg`)
    } catch (error) {
      console.warn(error.message)
      return require('assets/icons/konnectors/default.svg')
    }
  }

  render () {
    const { t, account, connector, accountConfig } = this.props
    return (
      <div className={styles['col-account-connection']}>
        <div className={styles['col-account-connection-header']}>
          <img
            className={styles['col-account-connection-icon']}
            src={this.getIcon(connector)} />
        </div>
        <div className={styles['col-account-connection-content']}>
          <div className={styles['col-account-connection-successTimeout']}>
            <h3>{t('account.connected.title', { name: connector.name })}</h3>
            <p>{t('account.connected.description', { name: connector.name })}</p>
            <p>
              {t('account.connected.ongoingSync', { name: connector.name })}
              <br />
              <span className={styles['bills-folder']}>{account.folderId}</span>
            </p>
            <p><button
              className={classNames('coz-btn', 'coz-btn--secondary', styles['coz-btn'])}
              onClick={accountConfig}
            >
              {t('account.connected.button.config')}
            </button></p>
            <p><button
              className={classNames('coz-btn', 'coz-btn--regular', styles['coz-btn'])}
              onClick={() => this.cancel()}
            >
              {t('account.connected.button.back')}
            </button></p>
          </div>
          <AccountConnectionData
            t={t}
            connector={connector}
            />
        </div>
      </div>
    )
  }
}

export default AccountSuccessTimeout
