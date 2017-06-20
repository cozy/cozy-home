import React from 'react'

import AccountConnection from '../../containers/AccountConnection'

const CreateAccountService = (props) => {
  const { konnector } = props
  return (
    <div className='coz-service-content'>
      <AccountConnection
        connector={konnector}
        fields={konnector.fields}
        {...props}
        />
    </div>
  )
}

export default CreateAccountService
