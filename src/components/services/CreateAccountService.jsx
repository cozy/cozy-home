import React from 'react'
import { connect } from 'react-redux'

import {
  getKonnectorConnectedAccount,
  getTriggerByKonnector
} from '../../reducers'

import AccountConnection from '../../containers/AccountConnection'

const CreateAccountService = props => {
  const { existingAccount, konnector, trigger, t } = props
  console.log(props)
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
  return (
    <div className="coz-service-content">
      <AccountConnection
        connector={konnector}
        trigger={trigger}
        values={values}
        {...props}
      />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    existingAccount: getKonnectorConnectedAccount(state, ownProps.konnector),
    trigger: getTriggerByKonnector(state, ownProps.konnector)
  }
}

export default connect(mapStateToProps)(CreateAccountService)
