import React, { useCallback } from 'react'
import { useI18n } from 'cozy-ui/react/I18n'
import { withClient } from 'cozy-client'

import CornerButton from './CornerButton'

const LogoutButton = ({ client }) => {
  const { t } = useI18n()
  const logout = useCallback(async () => {
    await client.logout()
    window.location.reload()
  })
  return <CornerButton label={t('app.logout')} icon="logout" onClick={logout} />
}

export default withClient(LogoutButton)
