import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'cozy-ui/react/I18n'
import { withClient } from 'cozy-client'

import CornerButton from './CornerButton'

const LogoutButton = ({ t, client }) => {
  const logout = useCallback(async () => {
    await client.logout()
    window.location.reload()
  })
  return <CornerButton label={t('app.logout')} icon="logout" onClick={logout} />
}

LogoutButton.propTypes = {
  t: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired
}

export default translate()(withClient(LogoutButton))
