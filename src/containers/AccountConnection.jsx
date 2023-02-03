import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { translate } from 'cozy-ui/transpiled/react/I18n'

import KonnectorInstall from 'components/KonnectorInstall'
import KonnectorMaintenance from 'components/KonnectorMaintenance'
import UpdateMessage from 'components/Banners/UpdateMessage'
import styles from 'styles/accountConnection.styl'
import { isKonnectorUpdateNeededError } from 'lib/konnectors'
import {
  enqueueConnection,
  getConnectionError,
  isConnectionConnected,
  isConnectionEnqueued
} from 'ducks/connections'

class AccountConnection extends Component {
  constructor(props, context) {
    super(props, context)
    this.store = context.store

    this.state = {
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
      error,
      handleConnectionSuccess,
      konnector,
      lang,
      onCancel,
      onDone,
      queued,
      success,
      successButtonLabel,
      t
    } = this.props
    const { connectionError, oAuthError, maintenance } = this.state
    const successMessages =
      success || queued ? this.buildSuccessMessages(konnector) : []
    const konnectorError = error || oAuthError || connectionError
    return (
      <div className={styles['col-account-connection']}>
        {!!konnector.available_version && (
          <UpdateMessage
            konnector={konnector}
            error={konnectorError}
            isBlocking={isKonnectorUpdateNeededError(konnectorError)}
          />
        )}
        {maintenance ? (
          <KonnectorMaintenance
            maintenance={maintenance}
            lang={lang}
            konnectorName={konnector.name}
          />
        ) : (
          <KonnectorInstall
            account={createdAccount}
            connector={konnector}
            onCancel={onCancel}
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
  error: getConnectionError(state.connections, ownProps.trigger),
  queued: isConnectionEnqueued(state.connections, ownProps.trigger),
  success: isConnectionConnected(state.connections, ownProps.trigger)
})

const mapDispatchToProps = dispatch => {
  return {
    enqueueConnection: trigger => dispatch(enqueueConnection(trigger))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate()(AccountConnection))
