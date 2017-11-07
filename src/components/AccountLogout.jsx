import React from 'react'
import classNames from 'classnames'
import { translate } from 'cozy-ui/react/I18n'
import styles from '../styles/accountLogout'

export const AccountLogout = ({ t, deleting, onDelete }) => {
  return (
    <div className={styles['col-account-form-delete']}>
      <h4>{t('account.disconnect.title')}</h4>
      <p>{t('account.disconnect.description')}</p>
      <button
        className={classNames(
          'coz-btn',
          'coz-btn--danger-outline',
          styles['coz-btn']
        )}
        disabled={deleting}
        aria-busy={deleting}
        onClick={onDelete}
      >
        {t('account.form.button.disconnect')}
      </button>
    </div>
  )
}

export default translate()(AccountLogout)
