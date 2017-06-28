import styles from '../styles/AccountForceConnection'

import React from 'react'
import { translate } from '../plugins/i18n'

const AccountForceConnection = ({ t, submitting, onForceConnection }) => {
  return (
    <div className={styles['account-forceConnection']}>
      <button
        className={submitting ? styles['submitting'] : ''}
        disabled={submitting}
        onClick={() => onForceConnection()}>
        {t('account.forceConnection')}
      </button>
    </div>
  )
}

export default translate()(AccountForceConnection)
