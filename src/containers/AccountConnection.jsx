import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { translate } from 'cozy-ui/react/I18n'

import KonnectorInstall from 'components/KonnectorInstall'
import KonnectorMaintenance from 'components/KonnectorMaintenance'
import UpdateMessage from 'components/Banners/UpdateMessage'
import KonnectorEdit from 'components/KonnectorEdit'
import {
  enqueueConnection,
  getConnectionError,
  isConnectionConnected,
  isConnectionEnqueued
} from 'ducks/connections'
import { isKonnectorUpdateNeededError } from 'lib/konnectors'
import styles from 'styles/accountConnection'

class AccountConnection extends Component {
  constructor(props, context) {
    super(props, context)
    this.store = context.store

    this.state = {
      account: props.existingAccount,
      editing: !!props.existingAccount,
      isFetching: false,
      maintenance: props.maintenance && props.maintenance[props.konnector.slug]
    }

    this.handleLoginSuccess = this.handleLoginSuccess.bind(this)
    this.handleError = this.handleError.bind(this)
    this.handleDeleteSuccess = this.handleDeleteSuccess.bind(this)
  }

  componentDidMount() {
    if (this.props.error) this.handleError({ message: this.props.error })
  }

  componentDidUpdate(prevProps) {
    const { success, queued } = this.props
    const { connectionError } = this.state

    const succeed = !prevProps.success && success
    const loginSucceed = !prevProps.queued && queued

    if (succeed || loginSucceed) {
      // we reset the error in case of persisted errors
      if (succeed && connectionError) this.setState({ connectionError: null })
      this.props.handleConnectionSuccess()
    }
  }

  componentWillReceiveProps(props) {
    this.UNSAFE_componentWillReceiveProps(props)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { existingAccount } = nextProps

    const accountHasJustBeenCreated =
      !this.props.existingAccount && !!existingAccount

    if (accountHasJustBeenCreated) {
      this.setState({
        account: existingAccount
      })
    }
  }

  handleLoginSuccess(trigger) {
    const { enqueueConnection, handleConnectionSuccess } = this.props
    handleConnectionSuccess()
    enqueueConnection(trigger)
  }

  handleDeleteSuccess() {
    this.setState({
      submitting: false
    })

    this.props.handleDeleteSuccess()
  }

  handleError(error) {
    // eslint-disable-next-line no-console
    console.error(error)

    this.setState({
      submitting: false,
      connectionError: error.message
    })
  }

  buildSuccessMessages(konnector) {
    const { t } = this.props
    const messages = [
      t('account.message.success.connect', {
        name: konnector.name
      })
    ]

    if (
      konnector.additionnalSuccessMessage &&
      konnector.additionnalSuccessMessage.message
    ) {
      messages.push(t(konnector.additionnalSuccessMessage.message))
    }

    return messages
  }

  render() {
    const {
      createdAccount,
      handleConnectionSuccess,
      fields,
      editing,
      konnector,
      lastSuccess,
      error,
      isRunning,
      onDone,
      queued,
      t,
      lang,
      trigger,
      success,
      successButtonLabel
    } = this.props
    const {
      account,
      connectionError,
      oAuthError,
      submitting,
      maintenance
    } = this.state
    const successMessages =
      success || queued ? this.buildSuccessMessages(konnector) : []
    const konnectorError = error || oAuthError || connectionError
    // If this is an update needed error AND the service has an update
    // available, we just display the blocking update banner
    // so we don't propagate the error to KonnectorEdit/KonnectorInstall
    const propagateError =
      isKonnectorUpdateNeededError(konnectorError) &&
      !!konnector.available_version
        ? false
        : true
    return (
      <div className={styles['col-account-connection']}>
        {!!konnector.available_version && (
          <UpdateMessage
            konnector={konnector}
            error={konnectorError}
            isBlocking={isKonnectorUpdateNeededError(konnectorError)}
          />
        )}
        {editing ? ( // Properly load the edit view or the initial config view
          <KonnectorEdit
            account={account}
            connector={konnector}
            error={propagateError && konnectorError}
            fields={fields}
            lastSuccess={lastSuccess}
            onDeleteSuccess={this.handleDeleteSuccess}
            onDeleteError={this.handleError}
            submitting={submitting || isRunning}
            trigger={trigger}
            maintenance={maintenance}
            lang={lang}
          />
        ) : maintenance ? (
          <KonnectorMaintenance
            maintenance={maintenance}
            lang={lang}
            konnectorName={konnector.name}
          />
        ) : (
          <KonnectorInstall
            account={createdAccount}
            connector={konnector}
            onDone={onDone}
            onLoginSuccess={this.handleLoginSuccess}
            onSuccess={handleConnectionSuccess}
            legacySuccess={success || queued}
            successMessage={t('account.success.title.connect')}
            successButtonLabel={successButtonLabel}
            successMessages={successMessages}
          />
        )}
      </div>
    )
  }
}

AccountConnection.contextTypes = {
  store: PropTypes.object
}

const mapStateToProps = (state, ownProps) => ({
  success: isConnectionConnected(state.connections, ownProps.trigger),
  error: getConnectionError(state.connections, ownProps.trigger),
  queued: isConnectionEnqueued(state.connections, ownProps.trigger)
})

const mapDispatchToProps = dispatch => {
  return {
    enqueueConnection: trigger => dispatch(enqueueConnection(trigger))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(translate()(AccountConnection)))
