import React from 'react'

import CreateAccountService from '../services/CreateAccountService'
import IntentHeader from 'cozy-ui/react/IntentHeader'

const CreateAccountIntent = ({ appData, konnector, onCancel, onTerminate }) => (
  <div className="col-create-account-intent">
    <IntentHeader
      appEditor={appData.cozyAppEditor}
      appName={appData.cozyAppName}
      appIcon={`../${appData.cozyIconPath}`}
    />
    {konnector && (
      <CreateAccountService
        konnector={konnector}
        onCancel={() => onCancel()}
        onSuccess={account => onTerminate(account)}
        closeModal={() => onCancel()}
      />
    )}
  </div>
)

export default CreateAccountIntent
