import React from 'react'
import { translate } from 'cozy-ui/react/I18n'

import AccountConnection from '../../containers/AccountConnection'

import { connect } from 'react-redux'

import {
  endConnectionCreation,
  isConnectionRunning,
  isCreatingConnection,
  startConnectionCreation
} from '../../ducks/connections'
import { isFetchingRegistryKonnector } from '../../ducks/registry'
import {
  getCreatedConnectionAccount,
  getTriggerByKonnectorAndAccount
} from '../../reducers'

class CreateAccountService extends React.Component {
  constructor(props, context) {
    super(props, context)
    const { t, konnector } = props
    const values = {}

    if (
      (konnector.fields &&
        konnector.fields.advancedFields &&
        konnector.fields.advancedFields.folderPath) ||
      (konnector.fields && konnector.folderPath)
    ) {
      values.folderPath = t('account.config.default_folder', {
        name: konnector.name
      })
      values.namePath = konnector.name
    }

    this.setState({ values: values })

    this.props.startCreation(this.props.konnector)
  }

  onSuccess(account) {
    this.props.endCreation()
    this.props.onSuccess(account)
  }

  render() {
    const { konnector, t } = this.props
    const { values } = this.state
    return (
      <div className="coz-service-content">
        <AccountConnection
          connector={konnector}
          onNext={account => this.onSuccess(account)}
          successButtonLabel={t('intent.service.success.button.label')}
          values={values}
          {...this.props}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  // infos from route parameters
  const { konnector } = ownProps
  const createdAccount = getCreatedConnectionAccount(state)
  const trigger = getTriggerByKonnectorAndAccount(
    state,
    konnector,
    createdAccount
  )
  return {
    createdAccount,
    isCreating: isCreatingConnection(state.connections),
    isWorking: isFetchingRegistryKonnector(state.registry),
    isRunning: isConnectionRunning(state.connections, trigger),
    trigger
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  startCreation: () => dispatch(startConnectionCreation(ownProps.konnector)),
  endCreation: () => dispatch(endConnectionCreation())
})

export default connect(mapStateToProps, mapDispatchToProps)(
  translate()(CreateAccountService)
)
