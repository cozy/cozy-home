import React, { useCallback, useState } from 'react'

import LogoutIcon from 'cozy-ui/transpiled/react/Icons/Logout'
import { useClient } from 'cozy-client'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import { useWebviewIntent } from 'cozy-intent'

import CornerButton from './CornerButton'
import { LogoutDialog } from 'components/HeroHeader/LogoutModal'
import { isFlagshipApp } from 'cozy-device-helper'

const LogoutButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const client = useClient()
  const webviewIntent = useWebviewIntent()
  const { t } = useI18n()

  const handleConfirm = useCallback(async () => {
    await client.logout()

    return webviewIntent?.call('logout') || window.location.reload()
  }, [client, webviewIntent])

  const handleButton = useCallback(
    () => (isFlagshipApp() ? setIsOpen(true) : handleConfirm()),
    [handleConfirm]
  )

  return (
    <>
      <LogoutDialog
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        onConfirm={handleConfirm}
      />

      <CornerButton
        label={t('logout')}
        icon={LogoutIcon}
        onClick={handleButton}
      />
    </>
  )
}

export default LogoutButton
