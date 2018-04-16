import React from 'react'
import { translate } from 'cozy-ui/react/I18n'

import IntentIframe from 'cozy-ui/react/IntentIframe'

const InstallKonnectorIntent = ({ data, onCancel, onError, onSuccess, t }) => (
  <IntentIframe
    action="INSTALL"
    data={{ ...data, exposeIntentFrameRemoval: false }}
    onCancel={onCancel}
    onError={error => onError && onError(buildInstallError(t, error))}
    onTerminate={konnector => {
      console.debug('InstallKonnectorIntent.onTerminate', konnector)
      onSuccess(konnector)
    }}
    type="io.cozy.konnectors"
  />
)

const buildInstallError = (t, error) => {
  const installError = new Error(t('intent.konnector.install.error.message'))
  installError.reason = error.message
  return installError
}

export default translate()(InstallKonnectorIntent)
