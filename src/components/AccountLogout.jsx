import React from 'react'

import { translate } from 'cozy-ui/react/I18n'
import { DeleteAccountButton } from 'cozy-harvest-lib'

import styles from 'styles/accountLogout'

export const AccountLogout = ({ t, account, onError, onSuccess }) => {
  return (
    <div className={styles['col-account-form-delete']}>
      <h4>{t('account.disconnect.title')}</h4>
      <p>{t('account.disconnect.description')}</p>
      <DeleteAccountButton
        account={account}
        onSuccess={onSuccess}
        onError={onError}
        extension="full"
      />
    </div>
  )
}

export default translate()(AccountLogout)
