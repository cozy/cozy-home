import React from 'react'

import AccountConnection from '../../containers/AccountConnection'

const CreateAccountService = (props) => {
  const { konnector, onSubmit } = props
  return (
    <div className='coz-service-content'>
      <AccountConnection
        connector={konnector}
        fields={konnector.fields}
        onSubmit={onSubmit}
        {...props}
        />
    </div>
  )
}

export default CreateAccountService
