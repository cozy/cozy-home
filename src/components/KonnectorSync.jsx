import styles from '../styles/KonnectorSync'

import React from 'react'
import classNames from 'classnames'
import { translate } from 'cozy-ui/react/I18n'

import DescriptionContent from './DescriptionContent'

function getDateLabel({ date, t, f }) {
  return f(date, t('account.message.synced.date_format'))
}

export const KonnectorSync = ({
  t,
  f,
  frequency,
  date,
  submitting,
  onForceConnection
}) => {
  const lastSyncMessage =
    (submitting && t('account.message.synced.syncing')) ||
    (date && getDateLabel({ date, t, f })) ||
    null
  return (
    <div>
      {
        <DescriptionContent
          title={t('account.message.synced.title')}
          messages={[
            `${t('account.message.synced.cron')} ${t(
              `account.message.synced.cron_${frequency}`
            )}.`,
            lastSyncMessage
              ? t('account.message.synced.last_sync', { date: lastSyncMessage })
              : ''
          ]}
        />
      }
      <div className={styles['account-forceConnection']}>
        <button
          className={
            submitting
              ? classNames('coz-btn', styles['submitting'])
              : classNames('coz-btn')
          }
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
