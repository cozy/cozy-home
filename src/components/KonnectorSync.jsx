import styles from '../styles/KonnectorSync'

import React from 'react'
import { translate } from 'cozy-ui/react/I18n'

import DescriptionContent from './DescriptionContent'

export const KonnectorSync = ({ t, f, date, editing, submitting, onForceConnection }) => {
  return (
    <div>
      { date && <DescriptionContent
        title={t('account.message.synced.title')}
        messages={[t('account.message.synced.last_sync', { date: f(date, t('account.message.synced.date_format')) })]}
      /> }
      { !editing && <div className={styles['account-forceConnection']}>
        <button
          className={submitting ? styles['submitting'] : ''}
          disabled={submitting}
          onClick={onForceConnection}
        >
          {t('account.forceConnection')}
        </button>
      </div> }
    </div>
  )
}

export default translate()(KonnectorSync)
