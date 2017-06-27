import styles from '../styles/accountConnection'

import React from 'react'
import { translate } from '../plugins/i18n'

import DescriptionContent from './DescriptionContent'
import AccountLoginForm from './AccountLoginForm'

export const ConnectorSuccess = ({ t, success, connector, isTimeout, folderPath, onAccountConfig, onCancel }) => {
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
      // FIXME: Why the hell do we use an AccountLoginForm for redirect?
      <AccountLoginForm
        onAccountConfig={onAccountConfig}
        onCancel={onCancel}
        isSuccess={!!success}
      />
    </div>
  )
}

export default translate()(ConnectorSuccess)
