import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { TriggerManager } from 'cozy-harvest-lib'
import flag from 'cozy-flags'

import LegacyAccountLoginForm from './LegacyAccountLoginForm'
import { getKonnector } from 'ducks/konnectors'

export class AccountLoginForm extends PureComponent {
  render() {
    const { account, konnector } = this.props
    return flag('harvest') ? (
      <TriggerManager account={account} konnector={konnector} />
    ) : (
      <LegacyAccountLoginForm {...this.props} />
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  konnector: getKonnector(state.cozy, ownProps.connectorSlug)
})

export default connect(mapStateToProps)(AccountLoginForm)
