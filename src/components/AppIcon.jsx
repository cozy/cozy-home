import React from 'react'
import CozyUiAppIcon from 'cozy-ui/react/AppIcon'
import { withClient } from 'cozy-client'

// TODO Update the component in cozy-ui to handle secure and domain natively
const AppIcon = ({ client, ...otherProps }) => {
  const cozyURL = new URL(client.getStackClient().uri)
  const domain = cozyURL.host
  const secure = cozyURL.protocol === 'https:'
  return <CozyUiAppIcon domain={domain} secure={secure} {...otherProps} />
}

export default withClient(AppIcon)
