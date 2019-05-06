import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { translate } from 'cozy-ui/react/I18n'

import KonnectorInstall from 'components/KonnectorInstall'
import KonnectorMaintenance from 'components/KonnectorMaintenance'
import UpdateMessage from 'components/Banners/UpdateMessage'
import KonnectorEdit from 'components/KonnectorEdit'
import { fetchAccount } from 'ducks/accounts'
import {
  deleteConnection,
  enqueueConnection,
  getConnectionError,
  isConnectionConnected,
  isConnectionDeleting,
  isConnectionEnqueued,
  launchTriggerAndQueue
} from 'ducks/connections'
import {
  isKonnectorUpdateNeededError,
  isKonnectorTwoFAError
} from 'lib/konnectors'
import uuid from 'uuid/v4'
import { popupCenter, waitForClosedPopup } from 'lib/popup'
import statefulForm from 'lib/statefulForm'
import styles from 'styles/accountConnection'

class AccountConnection extends Component {
  constructor(props, context) {
    super(props, context)
    this.store = this.context.store

    this.state = {
      account: props.existingAccount,
      editing: !!props.existingAccount,
      isFetching: false,
      maintenance: props.maintenance && props.maintenance[props.konnector.slug],
      lang: this.context.lang
    }

    this.handleLoginSuccess = this.handleLoginSuccess.bind(this)
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

  connectAccountOAuth(accountType, values, scope) {
    this.setState({
      submitting: true,
      oAuthError: null,
      oAuthTerminated: false
    })

    const cozyUrl = `${window.location.protocol}//${
      document.querySelector('[role=application]').dataset.cozyDomain
    }`

    // We use localStorage to store the account related data
    const OAuthState = { accountType }
    const OAuthStateKey = uuid()
    localStorage.setItem(OAuthStateKey, JSON.stringify(OAuthState))
    const newTab = popupCenter(
      `${cozyUrl}/accounts/${accountType}/start?scope=${scope}&state=${OAuthStateKey}&nonce=${Date.now()}`,
      `${accountType}_oauth`,
      800,
      800
    )
    return waitForClosedPopup(newTab, accountType)
      .then(accountID => {
        return this.terminateOAuth(accountID, values)
      })
      .catch(error => {
        this.setState({ submitting: false, oAuthError: error.message })
      })
  }

  terminateOAuth(accountID, accountValues) {
    this.setState({
      oAuthTerminated: true
    })

    this.props
      .fetchAccount(accountID)
      .then(account => this.store.updateAccount(account, accountValues))
      .then(account => {
        const { konnector } = this.props
        this.setState({ account: account })
        return this.runConnection(account).then(() => {
          this.setState({
            connector: konnector,
            submitting: false
          })
        })
      })
      .catch(error => this.handleError(error))
  }

  runConnection(account) {
    const { connectionError } = this.state
    if (isKonnectorTwoFAError(connectionError)) {
      /**
       * TWO FA Errors must be persisted to continue displaying harvest
       * for 2FA process
       */
      this.setState({ submitting: true })
    } else {
      this.setState({ submitting: true, connectionError: null })
    }

    return this.store
      .connectAccount(
        this.props.konnector,
        account,
        this.props.disableSuccessTimeout
      )
      .then(connection => {
        this.setState({ submitting: false })
        if (connection.account) {
          this.setState({
            account: connection.account
          })
        }

        if (connection.error) {
          return Promise.reject(connection.error)
        } else {
          return Promise.resolve(connection)
        }
      })
  }

  deleteConnection() {
    return this.props
      .deleteConnection()
      .then(() => this.handleDeleteSuccess())
      .catch(error => this.handleError(error))
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

  // @param isUpdate : used to force updating values not related to OAuth
  onSubmit = async () => {
    const { values, konnector } = this.props
    let valuesToSubmit = { ...values }

    // Update the path if the name path is the account name
    if (konnector && konnector.oauth) {
      return this.connectAccountOAuth(
        konnector.oauth.account_type || konnector.slug,
        valuesToSubmit,
        konnector.oauth.scope
      )
    }
  }

  buildSuccessMessages(konnector) {
    const { t } = this.context
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
      deleting,
      editing,
      konnector,
      lastSuccess,
      error,
      forceConnection,
      isRunning,
      onDone,
      queued,
      t,
      trigger,
      success,
      successButtonLabel
    } = this.props
    const {
      account,
      connectionError,
      oAuthError,
      oAuthTerminated,
      submitting,
      maintenance,
      lang
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
            error={konnectorError}
            isBlocking={isKonnectorUpdateNeededError(konnectorError)}
          />
        )}
        {editing ? ( // Properly load the edit view or the initial config view
          <KonnectorEdit
            account={account}
            connector={konnector}
            deleting={deleting}
            error={propagateError && konnectorError}
            fields={fields}
            lastSuccess={lastSuccess}
            oAuthTerminated={oAuthTerminated}
            onDelete={() => this.deleteConnection()}
            onForceConnection={forceConnection}
            onSubmit={this.onSubmit}
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
            error={propagateError && konnectorError}
            queued={queued}
            oAuthTerminated={oAuthTerminated}
            onDone={onDone}
            onLoginSuccess={this.handleLoginSuccess}
            onSubmit={() => this.onSubmit()}
            onSuccess={handleConnectionSuccess}
            submitting={submitting || isRunning}
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

const mapStateToProps = (state, ownProps) => ({
  success: isConnectionConnected(state.connections, ownProps.trigger),
  deleting: isConnectionDeleting(state.connections, ownProps.trigger),
  error: getConnectionError(state.connections, ownProps.trigger),
  queued: isConnectionEnqueued(state.connections, ownProps.trigger)
})

const mapDispatchToProps = (dispatch, ownProps) => {
  const { konnector, trigger } = ownProps
  return {
    fetchAccount: accountId =>
      dispatch(fetchAccount(accountId)).then(response => response.data[0]),
    forceConnection: () =>
      dispatch(
        launchTriggerAndQueue(trigger, !!konnector && konnector.loginDelay)
      ),
    deleteConnection: () => dispatch(deleteConnection(trigger)),
    enqueueConnection: trigger => dispatch(enqueueConnection(trigger))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(statefulForm()(withRouter(translate()(AccountConnection))))
