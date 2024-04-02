import React, { useCallback, useState } from 'react'

import { useClient } from 'cozy-client'
import { isFlagshipApp } from 'cozy-device-helper'
import { useWebviewIntent } from 'cozy-intent'
import LogoutIcon from 'cozy-ui/transpiled/react/Icons/Logout'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import { LogoutDialog } from 'components/HeroHeader/LogoutModal'

import CornerButton from './CornerButton'

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
