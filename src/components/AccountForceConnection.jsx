import styles from '../styles/AccountForceConnection'

import React from 'react'
import { translate } from '../plugins/i18n'

const AccountForceConnection = ({ t, submitting, forceConnection }) => {
  return (
    <div className={styles['account-forceConnection']}>
      {submitting
      ? <p>is submitting</p>
      : <p>is not submitting</p>
      }
      {submitting ? styles['submitting'] : 'no style'}
      <button
        className={submitting ? styles['submitting'] : ''}
        disabled={submitting}
        onClick={() => forceConnection()}>
        {t('account.forceConnection')}
      </button>
    </div>
  )
}

export default translate()(AccountForceConnection)
