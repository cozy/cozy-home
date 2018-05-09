import React from 'react'

import CreateAccountService from '../services/CreateAccountService'
import { getKonnectorIcon } from '../../lib/icons'
import IntentHeader from 'cozy-ui/react/IntentHeader'

const CreateAccountIntent = ({ konnector, onCancel, onTerminate }) => (
  <div className="col-create-account-intent">
    <IntentHeader
      appName={konnector.name}
      appIcon={getKonnectorIcon(konnector)}
    />
    {konnector && (
      <CreateAccountService
        konnector={konnector}
        onCancel={() => onCancel()}
        onSuccess={onTerminate}
        closeModal={() => onCancel()}
      />
    )}
  </div>
)

export default CreateAccountIntent
