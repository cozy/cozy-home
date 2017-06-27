import React from 'react'
import { translate } from '../plugins/i18n'

import DescriptionContent from './DescriptionContent'

export const ConnectorSync = ({ t, f, date }) => {
  return (
    <div>
      { date && <DescriptionContent
        title={t('account.message.synced.title')}
        messages={[t('account.message.synced.last_sync', { date: f(date, t('account.message.synced.date_format')) })]}
      /> }
    </div>
  )
}

export default translate()(ConnectorSync)
