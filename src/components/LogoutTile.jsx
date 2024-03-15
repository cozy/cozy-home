import React, { useCallback } from 'react'

import { useClient } from 'cozy-client'
import { isFlagshipApp } from 'cozy-device-helper'
import { useWebviewIntent } from 'cozy-intent'
import Icon from 'cozy-ui/transpiled/react/Icon'
import LogoutLargeIcon from 'cozy-ui/transpiled/react/Icons/LogoutLarge'
import SquareAppIcon from 'cozy-ui/transpiled/react/SquareAppIcon'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

const LogoutTile = () => {
  const { t } = useI18n()
  const client = useClient()
  const webviewIntent = useWebviewIntent()

  const logout = useCallback(async () => {
    await client.logout()

    return isFlagshipApp() && webviewIntent
      ? webviewIntent.call('logout')
      : window.location.reload()
  }, [client, webviewIntent])

  const { isMobile } = useBreakpoints()

  return (
    <div onClick={logout} className="scale-hover u-c-pointer">
      <SquareAppIcon
        name={t('logout')}
        IconContent={<Icon icon={LogoutLargeIcon} size={isMobile ? 32 : 44} />}
      />
    </div>
  )
}

export default LogoutTile
