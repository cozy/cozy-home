import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { AccountForm } from 'cozy-harvest-lib'
import flag from 'cozy-flags'

import LegacyAccountLoginForm from './LegacyAccountLoginForm'
import { getKonnector } from 'ducks/konnectors'

export class AccountLoginForm extends PureComponent {
  render() {
    const { account, konnector } = this.props
    const initialValues = account ? account.auth : {}
    return flag('harvest') ? (
      <AccountForm initialValues={initialValues} {...konnector} />
    ) : (
      <LegacyAccountLoginForm {...this.props} />
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  konnector: getKonnector(state.cozy, ownProps.connectorSlug)
})

export default connect(mapStateToProps)(AccountLoginForm)
