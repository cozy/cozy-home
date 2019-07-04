import React from 'react'
import { connect } from 'react-redux'

import { translate } from 'cozy-ui/react/I18n'

import AccountConnection from 'containers/AccountConnection'
import {
  endConnectionCreation,
  isConnectionRunning,
  isCreatingConnection,
  startConnectionCreation
} from 'ducks/connections'
import {
  getCreatedConnectionAccount,
  getTriggerByKonnectorAndAccount
} from 'reducers/index'

class CreateAccountService extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.props.startCreation(this.props.konnector)
  }

  onSuccess = account => {
    this.props.endCreation()
    this.props.onSuccess(account)
  }

  render() {
    const { t } = this.props
    return (
      <div className="coz-service-content">
        <AccountConnection
          onDone={this.onSuccess}
          successButtonLabel={t('intent.service.success.button.label')}
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
    isRunning: isConnectionRunning(state.connections, trigger),
    trigger
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  startCreation: () => dispatch(startConnectionCreation(ownProps.konnector)),
  endCreation: () => dispatch(endConnectionCreation())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate()(CreateAccountService))
