import styles from '../styles/KonnectorSync'

import React from 'react'
import classNames from 'classnames'
import { translate } from 'cozy-ui/react/I18n'

import DescriptionContent from './DescriptionContent'

export const KonnectorSync = ({ t, f, date, submitting, onForceConnection }) => {
  return (
    <div>
      { date && <DescriptionContent
        title={t('account.message.synced.title')}
        messages={[t('account.message.synced.last_sync', { date: f(date, t('account.message.synced.date_format')) })]}
      /> }
      <div className={styles['account-forceConnection']}>
        <button
          className={submitting ? classNames('coz-btn', styles['submitting']) : classNames('coz-btn')}
          disabled={submitting}
          aria-busy={submitting}
          onClick={onForceConnection}
        >
          {t('account.forceConnection')}
        </button>
      </div>
    </div>
  )
}

export default translate()(KonnectorSync)
