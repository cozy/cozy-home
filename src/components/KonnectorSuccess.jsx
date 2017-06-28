import styles from '../styles/accountConnection'

import React from 'react'
import { translate } from '../plugins/i18n'

import DescriptionContent from './DescriptionContent'

export const KonnectorSuccess = ({ t, success, connector, isTimeout, folderPath, onAccountConfig, onCancel }) => {
  return (
    <div>
      <DescriptionContent
        title={t(`account.success.title.${success.type}`, { name: connector.name })}
        messages={success.messages}
      >
        { Array.isArray(connector.dataType) && connector.dataType.includes('bill') &&
          <p>
            {t(`account.message.${isTimeout ? 'syncing' : 'synced'}.bill`, { name: connector.name })}
            <br />
            <span className={styles['col-account-success-highlighted-data']}>{folderPath}</span>
          </p>
        }
      </DescriptionContent>

      <div className={styles['coz-form-controls']}>
        <div className={styles['col-account-form-success-buttons']}>
          <p><button
            className={classNames('coz-btn', 'coz-btn--secondary', styles['coz-btn'])}
            onClick={onAccountConfig}
          >
            {t('account.success.button.config')}
          </button></p>
          <p><button
            className={classNames('coz-btn', 'coz-btn--regular', styles['coz-btn'])}
            onClick={onCancel}
          >
            {t('account.success.button.back')}
          </button></p>
        </div>
      </div>
    </div>
  )
}

export default translate()(KonnectorSuccess)
