import styles from '../styles/accountConnection'

import React, { Component } from 'react'
import classNames from 'classnames'
import { translate } from '../plugins/i18n'

class AccountSuccessForm extends Component {
  render () {
    const { t, account, connector, onAccountConfig, onCancel } = this.props
    return (
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
          onClick={onAccountConfig}
        >
          {t('account.connected.button.config')}
        </button></p>
        <p><button
          className={classNames('coz-btn', 'coz-btn--regular', styles['coz-btn'])}
          onClick={onCancel}
        >
          {t('account.connected.button.back')}
        </button></p>
      </div>
    )
  }
}

export default translate()(AccountSuccessForm)
