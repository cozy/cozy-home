import React from 'react'
import { translate } from 'cozy-ui/react/I18n'

import DescriptionContent from './DescriptionContent'

export const KonnectorSync = ({ t, f, date }) => {
  return (
    <div>
      { date && <DescriptionContent
        title={t('account.message.synced.title')}
        messages={[t('account.message.synced.last_sync', { date: f(date, t('account.message.synced.date_format')) })]}
      /> }
    </div>
  )
}

export default translate()(KonnectorSync)
