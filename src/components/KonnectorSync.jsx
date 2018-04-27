import styles from '../styles/KonnectorSync'

import React from 'react'
import classNames from 'classnames'
import DateFns from 'date-fns'
import { translate } from 'cozy-ui/react/I18n'

import DescriptionContent from './DescriptionContent'

function getDateLabel({ date, t, f }) {
  return f(DateFns.parse(date), t('account.message.synced.date_format'))
}

export const KonnectorSync = ({
  t,
  f,
  frequency,
  lastSuccessDate,
  maintenance,
  submitting,
  onForceConnection
}) => {
  const lastSyncMessage =
    (submitting && t('account.message.synced.syncing')) ||
    (!lastSuccessDate && t('account.message.synced.unknown')) ||
    (lastSuccessDate && getDateLabel({ date: lastSuccessDate, t, f })) ||
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
      {!maintenance && (
        <button
          className={
            submitting
              ? classNames(
                  styles['account-forceConnection'],
                  styles['submitting']
                )
              : classNames(styles['account-forceConnection'])
          }
          disabled={submitting}
          aria-busy={submitting}
          onClick={onForceConnection}
        >
          {t('account.forceConnection')}
        </button>
      )}
    </div>
  )
}

export default translate()(KonnectorSync)
