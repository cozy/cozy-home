import React from 'react'

import AccountConnection from '../../containers/AccountConnection'

const CreateAccountService = props => {
  const { konnector } = props
  return (
    <div className="coz-service-content">
      <AccountConnection
        connector={konnector}
        existingAccount={
          konnector.accounts.length ? konnector.accounts[0] : null
        }
        fields={konnector.fields}
        {...props}
      />
    </div>
  )
}

export default CreateAccountService
