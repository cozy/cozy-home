import React, { useCallback } from 'react'
import Icon from 'cozy-ui/transpiled/react/Icon'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { useClient } from 'cozy-client'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import SquareAppIcon from 'cozy-ui/transpiled/react/SquareAppIcon'

import LogoutLargeIcon from 'cozy-ui/transpiled/react/Icons/LogoutLarge'

const LogoutTile = () => {
  const { t } = useI18n()
  const client = useClient()

  const logout = useCallback(async () => {
    await client.logout()
    window.location.reload()
  }, [client])
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
