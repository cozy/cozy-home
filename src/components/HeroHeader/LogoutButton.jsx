import React, { useCallback } from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { useClient } from 'cozy-client'
import LogoutIcon from 'cozy-ui/transpiled/react/Icons/Logout'
import { useWebviewIntent } from 'cozy-intent'
import { isFlagshipApp } from 'cozy-device-helper'

import CornerButton from './CornerButton'

const LogoutButton = () => {
  const { t } = useI18n()
  const client = useClient()
  const webviewIntent = useWebviewIntent()

  const logout = useCallback(async () => {
    await client.logout()

    return isFlagshipApp() && webviewIntent
      ? webviewIntent.call('logout')
      : window.location.reload()
  }, [client, webviewIntent])
  return <CornerButton label={t('logout')} icon={LogoutIcon} onClick={logout} />
}

export default LogoutButton
