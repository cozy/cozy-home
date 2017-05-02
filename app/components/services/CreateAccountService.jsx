/** @jsx h */
import { h } from 'preact'

import AccountConnection from '../AccountConnection'

const CreateAccountService = (props) => {
  const { konnector, onSubmit } = props
  return (
    <div class='coz-service-content'>
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
