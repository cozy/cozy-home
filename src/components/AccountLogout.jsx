import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import { Button } from 'cozy-ui/react/Button'
import styles from '../styles/accountLogout'

export const AccountLogout = ({ t, deleting, onDelete }) => {
  return (
    <div className={styles['col-account-form-delete']}>
      <h4>{t('account.disconnect.title')}</h4>
      <p>{t('account.disconnect.description')}</p>
      <Button
        className={styles['coz-btn']}
        theme="danger-outline"
        disabled={deleting}
        busy={deleting}
        onClick={onDelete}
      >
        {t('account.form.button.disconnect')}
      </Button>
    </div>
  )
}

export default translate()(AccountLogout)
