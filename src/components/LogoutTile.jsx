import React, { useCallback } from 'react'
import Icon from 'cozy-ui/react/Icon'
import { useI18n } from 'cozy-ui/react/I18n'
import { useClient } from 'cozy-client'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'

const LogoutTile = () => {
  const { t } = useI18n()
  const client = useClient()

  const logout = useCallback(
    async () => {
      await client.logout()
      window.location.reload()
    },
    [client]
  )
  const { isMobile } = useBreakpoints()

  return (
    <button onClick={logout} className="item">
      <div className="item-icon">
        <Icon icon="logout-large" size={isMobile ? 32 : 40} />
      </div>
      <h3 className="item-title">{t('logout')}</h3>
    </button>
  )
}

export default LogoutTile
