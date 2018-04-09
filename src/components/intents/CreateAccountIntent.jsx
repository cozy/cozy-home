import React from 'react'

import CreateAccountService from '../services/CreateAccountService'
import ServiceBar from '../services/ServiceBar'

const CreateAccountIntent = ({ appData, konnector, onCancel, onTerminate }) => (
  <div className="col-create-account-intent">
    <ServiceBar
      appEditor={appData.cozyAppEditor}
      appName={appData.cozyAppName}
      iconPath={`../${appData.cozyIconPath}`}
      onCancel={() => onCancel()}
      closeable
    />
    { konnector && <CreateAccountService
      konnector={konnector}
      onCancel={() => onCancel()}
      onSuccess={account => onTerminate(account)}
      closeModal={() => onCancel()}
    />}
  </div>
)

export default CreateAccountIntent
