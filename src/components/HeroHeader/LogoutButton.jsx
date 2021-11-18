import React, { useCallback } from 'react'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { useClient } from 'cozy-client'
import LogoutIcon from 'cozy-ui/transpiled/react/Icons/Logout'

import CornerButton from './CornerButton'

const LogoutButton = () => {
  const { t } = useI18n()
  const client = useClient()
  const logout = useCallback(async () => {
    if (window.cozy.isWebview)
      return window.ReactNativeWebView.postMessage('LOGOUT')

    await client.logout()
    window.location.reload()
  }, [client])
  return <CornerButton label={t('logout')} icon={LogoutIcon} onClick={logout} />
}

export default LogoutButton
