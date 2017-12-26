import React from 'react'
import { connect } from 'react-redux'

import {
  getConnectionStatus,
  getKonnectorConnectedAccount,
  getTriggerByKonnector
} from '../../reducers'

import AccountConnection from '../../containers/AccountConnection'

class CreateAccountService extends React.Component {
  constructor(props, context) {
    super(props, context)
    const { t, konnector, existingAccount } = props
    const values =
      (existingAccount && Object.assign({}, existingAccount.auth)) || {}
    // Split the actual folderPath account to get namePath & folderPath values
    if (existingAccount && values.folderPath) {
      values.folderPath = existingAccount.auth.folderPath.substring(
        0,
        existingAccount.auth.folderPath.lastIndexOf('/')
      )
      values.namePath = existingAccount.auth.folderPath.substring(
        existingAccount.auth.folderPath.lastIndexOf('/') + 1,
        existingAccount.auth.folderPath.length
      )
    } else if (
      (existingAccount === null &&
        konnector.fields &&
        konnector.fields.advancedFields &&
        konnector.fields.advancedFields.folderPath) ||
      (existingAccount === null && konnector.fields && konnector.folderPath)
    ) {
      values.folderPath =
        konnector.fields.advancedFields.folderPath.default ||
        t('account.config.default_folder')
      values.namePath = konnector.name
    }
    this.setState({ values: values })
  }

  componentWillReceiveProps(props) {
    if (this.props.status === 'running') {
    } else if (props.status && props.status === 'running') props.onSuccess()
  }

  render() {
    const { onSuccess, alertDeleteSuccess, konnector, trigger } = this.props
    const { values } = this.state
    return (
      <div className="coz-service-content">
        <AccountConnection
          alertDeleteSuccess={alertDeleteSuccess}
          connector={konnector}
          onSuccess={onSuccess}
          trigger={trigger}
          values={values}
          {...this.props}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    existingAccount: getKonnectorConnectedAccount(state, ownProps.konnector),
    trigger: getTriggerByKonnector(state, ownProps.konnector),
    status: getConnectionStatus(state, ownProps.konnector)
  }
}

export default connect(mapStateToProps)(CreateAccountService)
