import React from 'react'
import { connect } from 'react-redux'

import { getKonnectorConnectedAccount } from '../../ducks/connections'

import AccountConnection from '../../containers/AccountConnection'

const CreateAccountService = props => {
  const { existingAccount, konnector } = props
  return (
    <div className="coz-service-content">
      <AccountConnection
        connector={konnector}
        existingAccount={existingAccount}
        fields={konnector.fields}
        {...props}
      />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    existingAccount: getKonnectorConnectedAccount(
      state.cozy,
      ownProps.konnector
    )
  }
}

export default connect(mapStateToProps)(CreateAccountService)
