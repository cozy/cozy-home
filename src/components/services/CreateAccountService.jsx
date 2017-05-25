import React from 'react'

import AccountConnection from '../AccountConnection'

const CreateAccountService = (props) => {
  const { konnector, onSubmit, onOAuth } = props
  return (
    <div className='coz-service-content'>
      <AccountConnection
        connector={konnector}
        fields={konnector.fields}
        onSubmit={onSubmit}
        onOAuth={onOAuth}
        {...props}
        />
    </div>
  )
}

export default CreateAccountService
