import React, { useCallback } from 'react'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { useClient } from 'cozy-client'

import CornerButton from './CornerButton'

const LogoutButton = () => {
  const { t } = useI18n()
  const client = useClient()
  const logout = useCallback(async () => {
    await client.logout()
    window.location.reload()
  }, [client])
  return <CornerButton label={t('logout')} icon="logout" onClick={logout} />
}

export default LogoutButton
