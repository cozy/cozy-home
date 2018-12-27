import React, { PureComponent } from 'react'

import LegacyAccountLoginForm from './LegacyAccountLoginForm'

export class AccountLoginForm extends PureComponent {
  render() {
    return <LegacyAccountLoginForm {...this.props} />
  }
}

export default AccountLoginForm
