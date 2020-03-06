import React, { useCallback } from 'react'
import Icon from 'cozy-ui/react/Icon'
import { useI18n } from 'cozy-ui/react/I18n'
import { useClient } from 'cozy-client'

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
  return (
    <button onClick={logout} className="item">
      <div className="item-icon">
        <Icon icon="logout-large" size={40} />
      </div>
      <h3 className="item-title">{t('logout')}</h3>
    </button>
  )
}

export default LogoutTile
