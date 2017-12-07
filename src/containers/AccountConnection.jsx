import styles from '../styles/accountConnection'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  deleteConnection,
  getConnectionError,
  isConnectionConnected,
  isConnectionDeleting,
  isConnectionEnqueued,
  launchTriggerAndQueue
} from '../ducks/connections'
import { fetchAccount } from '../ducks/accounts'
import classNames from 'classnames'

import { translate } from 'cozy-ui/react/I18n'

import KonnectorInstall from '../components/KonnectorInstall'
import KonnectorEdit from '../components/KonnectorEdit'
import { getKonnectorIcon } from '../lib/icons'
import { popupCenter, waitForClosedPopup } from '../lib/popup'
import statefulForm from '../lib/statefulForm'

const SUCCESS_TYPES = {
  UPDATE: 'update',
  CONNECT: 'connect',
  TIMEOUT: 'timeout'
}

class AccountConnection extends Component {
  constructor(props, context) {
    super(props, context)
    this.store = this.context.store
    // const konnector = props.konnector
    this.state = {
      account: this.props.existingAccount,
      editing: !!this.props.existingAccount
    }

    // Ugly reference to existing account folder path. When updating the
    // connection form, the folderPath disappears. Maybe because of the
    // statefulForm, we don't know at this time.
    this.editedFolderPath =
      this.props.existingAccount &&
      this.props.existingAccount.auth &&
      this.props.existingAccount.auth.folderPath

    if (this.props.error) this.handleError({ message: this.props.error })
  }

  getFolderPathIfNecessary(fields, account) {
    const { t } = this.context
    const folderField = fields && fields.folderPath
    if (!folderField) return null

    const auth = account && account.auth
    if (auth && auth.folderPath) {
      return auth.folderPath
    }

    return folderField.default || t('account.config.default_folder')
  }

  componentWillReceiveProps({ existingAccount, success }) {
    const hasJusSucceed = !this.props.success && success

    if (hasJusSucceed && this.props.onSuccess)
      this.props.onSuccess(this.state.account)

    this.setState({
      account: existingAccount
    })
  }

  connectAccount(auth) {
    const { folderPath } = auth
    const { konnector } = this.props
    let { account } = this.state

    if (account) {
      return this.updateAccount(konnector, account, {
        ...auth,
        folderPath: this.editedFolderPath
      })
    }

    account = {
      auth
    }

    this.setState({ account: account })

    return this.runConnection(account, folderPath).catch(error =>
      this.handleError(error)
    )
  }

  connectAccountOAuth(accountType, values, scope) {
    this.setState({
      submitting: true,
      oAuthTerminated: false
    })

    const cozyUrl = `${window.location.protocol}//${document.querySelector(
      '[role=application]'
    ).dataset.cozyDomain}`
    const newTab = popupCenter(
      `${cozyUrl}/accounts/${accountType}/start?scope=${scope}&state=xxx&nonce=${Date.now()}`,
      `${accountType}_oauth`,
      800,
      800
    )
    return waitForClosedPopup(newTab, `${accountType}_oauth`)
      .then(accountID => {
        return this.terminateOAuth(accountID, values)
      })
      .catch(error => {
        this.setState({ submitting: false, error: error.message })
      })
  }

  terminateOAuth(accountID, accountValues) {
    // const { slug } = this.props.konnector

    this.setState({
      oAuthTerminated: true
    })

    this.props
      .fetchAccount(accountID)
      .then(account => {
        const { konnector } = this.props
        const { folderPath } = accountValues
        this.setState({ account: account })
        return this.runConnection(account, folderPath).then(connection => {
          this.setState({
            connector: konnector,
            submitting: false
          })
          // this.handleConnectionSuccess(connection.successTimeout)
        })
      })
      .catch(error => this.handleError(error))
  }

  runConnection(account, folderPath) {
    this.setState({ submitting: true })

    return this.store
      .connectAccount(
        this.props.konnector,
        account,
        folderPath,
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

  updateAccount(connector, account, values) {
    Object.assign(account.auth, values)

    this.setState({ submitting: true })

    return this.store
      .updateAccount(connector, account, values)
      .then(account => {
        this.setState({ account: account })
        return this.store
          .runAccount(
            this.props.trigger,
            connector,
            account,
            this.props.disableSuccessTimeout
          )
          .then(() => {
            this.setState({
              submitting: false
            })
          })
      })
      .catch(error => this.handleError(error))
  }

  deleteConnection() {
    return this.props
      .deleteConnection()
      .then(() => this.handleDeleteSuccess())
      .catch(error => this.handleError(error))
  }

  handleDeleteSuccess() {
    this.setState({
      submitting: false
    })

    this.props.alertSuccess([{ message: 'account.message.success.delete' }])
  }

  handleError(error) {
    console.error(error)

    this.setState({
      submitting: false
    })
  }

  // @param isUpdate : used to force updating values not related to OAuth
  submit(values) {
    // namePath defined by the user is concatened with the folderPath
    values.namePath &&
      (values.folderPath = `${values.folderPath}/${values.namePath}`)

    delete values['namePath']

    return this.props.konnector && this.props.konnector.oauth
      ? this.connectAccountOAuth(
          this.props.konnector.slug,
          values,
          this.props.konnector.oauth_scope
        )
      : this.connectAccount(values)
  }

  cancel() {
    this.props.onCancel()
  }

  goToConfig() {
    this.setState({ editing: true })
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
      deleting,
      konnector,
      lastExecution,
      disableSuccessTimeout,
      error,
      forceConnection,
      isUnloading,
      isRunning,
      queued,
      t,
      trigger,
      success
    } = this.props
    const { account, editing, oAuthTerminated, submitting } = this.state
    const { driveUrl } = this.store
    const lastSync = this.state.lastSync || (account && account.lastSync)
    const { fields } = konnector
    const folderPath = this.getFolderPathIfNecessary(fields, account)
    if (fields.folderPath && !fields.folderPath.default)
      fields.folderPath.default = folderPath
    const isTimeout = success && success.type === SUCCESS_TYPES.TIMEOUT

    const successMessages =
      success || queued ? this.buildSuccessMessages(konnector) : []

    return (
      <div className={styles['col-account-connection']}>
        <div className={styles['col-account-connection-header']}>
          <img
            className={classNames(
              styles['col-account-connection-icon'],
              'col-account-connection-icon'
            )}
            src={getKonnectorIcon(konnector)}
          />
        </div>

        {// Properly load the edit view or the initial config view
        editing ? (
          <KonnectorEdit
            account={account}
            connector={konnector}
            deleting={deleting}
            disableSuccessTimeout={disableSuccessTimeout}
            driveUrl={driveUrl}
            error={error}
            fields={fields}
            folderPath={folderPath}
            isUnloading={isUnloading}
            lastExecution={lastExecution}
            lastSync={lastSync}
            oAuthTerminated={oAuthTerminated}
            onCancel={() => this.cancel()}
            onDelete={() => this.deleteConnection()}
            onForceConnection={forceConnection}
            onSubmit={values =>
              this.connectAccount(Object.assign(values, { folderPath }))}
            submitting={submitting || isRunning}
            success={success}
            trigger={trigger}
          />
        ) : (
          <KonnectorInstall
            account={account}
            connector={konnector}
            deleting={deleting}
            disableSuccessTimeout={disableSuccessTimeout}
            driveUrl={driveUrl}
            error={error}
            fields={fields}
            folderPath={folderPath}
            forceDisabled={oAuthTerminated}
            isTimeout={isTimeout}
            isUnloading={isUnloading}
            oAuthTerminated={oAuthTerminated}
            onCancel={() => this.cancel()}
            onDelete={() => this.deleteConnection()}
            onSubmit={values => this.submit(values)}
            submitting={submitting || isRunning}
            success={success || queued}
            successMessage={t(
              queued
                ? 'account.success.title.timeout'
                : 'account.success.title.success',
              { name: konnector.name }
            )}
            successMessages={successMessages}
            trigger={trigger}
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
  const { trigger } = ownProps
  return {
    fetchAccount: accountId =>
      dispatch(fetchAccount(accountId)).then(response => response.data[0]),
    forceConnection: () => dispatch(launchTriggerAndQueue(trigger)),
    deleteConnection: () => dispatch(deleteConnection(trigger))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  statefulForm()(translate()(AccountConnection))
)
