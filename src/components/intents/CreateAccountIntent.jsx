import React from 'react'

import CreateAccountService from 'components/services/CreateAccountService'
import KonnectorHeaderIcon from 'components/KonnectorHeaderIcon'
// import { getKonnectorIcon } from '../../lib/icons'
// import IntentHeader from 'cozy-ui/react/IntentHeader'

const CreateAccountIntent = ({ konnector, onCancel, onTerminate }) => (
  <div className="col-create-account-intent">
    <KonnectorHeaderIcon konnector={konnector} center />
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
