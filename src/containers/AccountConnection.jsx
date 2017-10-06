import styles from '../styles/accountConnection'

import React, { Component } from 'react'

import KonnectorInstall from '../components/KonnectorInstall'
import KonnectorEdit from '../components/KonnectorEdit'
import {popupCenter, waitForClosedPopup} from '../lib/popup'
import {getKonnectorIcon} from '../lib/icons'

const SUCCESS_TYPES = {
  UPDATE: 'update',
  CONNECT: 'connect',
  TIMEOUT: 'timeout'
}

class AccountConnection extends Component {
  constructor (props, context) {
    super(props, context)
    this.store = this.context.store
    const konnector = props.connector
    this.state = {
      account: this.props.existingAccount,
      editing: !!this.props.existingAccount,
      success: null,
      submitting: this.store.isConnectionStatusRunning(konnector),
      error: this.props.error || this.store.getConnectionError(konnector)
    }

    if (this.props.error) this.handleError({message: this.props.error})

    this.connectionListener = status => {
      this.setState({
        submitting: this.store.isConnectionStatusRunning(this.props.connector),
        error: this.store.getConnectionError(this.props.connector),
        // dirty hack waiting for better account management in store
        lastSync: Date.now()
      })
    }

    this.store.addConnectionStatusListener(konnector, this.connectionListener)
  }

  getFolderPathIfNecessary (connector, account) {
    const { t } = this.context
    const folderField = connector && connector.fields && connector.fields.folderPath
    if (!folderField) return null

    const auth = account && account.auth
    if (auth && auth.folderPath) {
      return auth.folderPath
    }

    return folderField.default || t('account.config.default_folder', connector)
  }

  componentWillReceiveProps ({ existingAccount }) {
    this.setState({
      account: existingAccount
    })
  }

  componentWillUnmount () {
    this.store.removeConnectionStatusListener(this.props.connector, this.connectionListener)
  }

  connectAccount (auth) {
    const { folderPath } = auth
    const { connector } = this.props
    let { account } = this.state

    if (account) {
      return this.updateAccount(connector, account, auth)
    }

    account = {
      auth
    }

    this.setState({account: account})

    return this.runConnection(account, folderPath)
      .then(connection => {
        this.handleConnectionSuccess(connection.successTimeout)
      })
      .catch(error => this.handleError(error))
  }

  connectAccountOAuth (accountType, values, scope) {
    this.setState({
      submitting: true,
      oAuthTerminated: false
    })

    const cozyUrl =
      `${window.location.protocol}//${document.querySelector('[role=application]').dataset.cozyDomain}`
    const newTab = popupCenter(`${cozyUrl}/accounts/${accountType}/start?scope=${scope}&state=xxx&nonce=${Date.now()}`, `${accountType}_oauth`, 800, 800)
    return waitForClosedPopup(newTab, `${accountType}_oauth`)
    .then(accountID => {
      return this.terminateOAuth(accountID, values)
    })
    .catch(error => {
      this.setState({submitting: false, error: error.message})
    })
  }

  terminateOAuth (accountID, accountValues) {
    const { slug } = this.props.connector

    this.setState({
      oAuthTerminated: true
    })

    return this.store.fetchKonnectorInfos(slug)
      .then(konnector => {
        return this.store
          .fetchAccounts(slug)
          .then(accounts => {
            konnector.accounts = accounts
            const currentIdx = accounts.findIndex(a => a._id === accountID)
            // get all properties except folderPath in newValues
            const {folderPath, ...newValues} = accountValues
            const account = Object.assign({}, accounts[currentIdx], {auth: newValues})
            this.setState({account: account})
            return this.runConnection(account, folderPath)
              .then(connection => {
                this.setState({
                  connector: konnector,
                  isConnected: konnector.accounts.length !== 0,
                  selectedAccount: currentIdx,
                  submitting: false
                })
                this.handleConnectionSuccess(connection.successTimeout)
              })
          })
          .catch(error => this.handleError(error))
      })
  }

  runConnection (account, folderPath) {
    this.setState({ submitting: true })

    return this.store.connectAccount(this.props.connector, account, folderPath, this.props.disableSuccessTimeout)
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

  updateAccount (connector, account, values) {
    Object.assign(account.auth, values)

    this.setState({ submitting: true })

    return this.store.updateAccount(connector, account, values)
    .then(account => {
      this.setState({ account: account })
      return this.store.runAccount(connector, account, this.props.disableSuccessTimeout)
    })
    .then(() => this.handleUpdateSuccess())
    .catch(error => this.handleError(error))
  }

  deleteAccount () {
    // FIXME: disable unused account constant, see below
    // const { account } = this.state
    this.setState({ deleting: true })
    // FIXME: We're supposed to remove only the current account
    // but still we doesn't support the multi-account, we choose to remove all
    // existing accounts, in case of duplicates.
    this.store.deleteAccounts(this.props.connector/*, account */)
      .then(() => this.handleDeleteSuccess())
      .catch(error => this.handleError(error))
  }

  handleDeleteSuccess () {
    this.setState({
      submitting: false,
      deleting: false,
      error: null,
      success: null // exception for the delete success which uses alerts
    })

    this.props.alertSuccess([{message: 'account.message.success.delete'}])
  }

  handleConnectionSuccess (successTimeout) {
    const { t } = this.context
    const messages = [t('account.message.success.connect', {name: this.props.connector.name})]
    if (successTimeout) {
      return this.handleSuccess(SUCCESS_TYPES.TIMEOUT, messages)
    } else {
      return this.handleSuccess(SUCCESS_TYPES.CONNECT, messages)
    }
  }

  handleUpdateSuccess () {
    const { t } = this.context
    const messages = [t('account.message.success.update', {name: this.props.connector.name})]
    this.handleSuccess(SUCCESS_TYPES.UPDATE, messages)
  }

  handleSuccess (type, messages = []) {
    const { t } = this.context
    if (this.props.connector.additionnalSuccessMessage && this.props.connector.additionnalSuccessMessage.message) {
      messages.push(t(this.props.connector.additionnalSuccessMessage.message))
    }

    // when service usage
    if (this.props.onSuccess) return this.props.onSuccess(this.state.account)

    this.setState({
      submitting: false,
      deleting: false,
      error: null,
      success: {
        type,
        messages
      }
    })
  }

  handleError (error) {
    console.error(error)

    this.setState({
      submitting: false,
      deleting: false,
      error: error,
      success: null
    })
  }

  // @param isUpdate : used to force updating values not related to OAuth
  submit (values) {
    this.setState({
      error: null
    })

    return this.props.connector && this.props.connector.oauth
         ? this.connectAccountOAuth(this.props.connector.slug, values, this.props.connector.oauth_scope)
         : this.connectAccount(values)
  }

  cancel () {
    this.props.onCancel()
  }

  goToConfig () {
    this.setState({ success: null, editing: true })
  }

  // TODO: use a better helper
  getIcon (konnector) {
    try {
      return getKonnectorIcon(konnector.slug)
    } catch (error) {
      console.warn(error.message)
      return require('assets/icons/konnectors/default.svg')
    }
  }

  forceConnection () {
    this.setState({submitting: true})
    this.store.runAccount(this.props.connector, this.state.account)
    .then(() => this.setState({submitting: false}))
    .catch(error => this.handleError(error))
  }

  render () {
    const { connector, disableSuccessTimeout, fields, isUnloading } = this.props
    const { account, deleting, editing, error, oAuthTerminated, submitting, success } = this.state
    const { driveUrl } = this.store
    const lastSync = this.state.lastSync || (account && account.lastSync)
    const folderPath = this.getFolderPathIfNecessary(connector, account)
    const isTimeout = (success && success.type === SUCCESS_TYPES.TIMEOUT)

    return (
      <div className={styles['col-account-connection']}>
        <div className={styles['col-account-connection-header']}>
          <img
            className={styles['col-account-connection-icon']}
            src={this.getIcon(connector)} />
        </div>

        { // Properly loed the edit view orthe initial config view
          editing
          ? <KonnectorEdit
            account={account}
            connector={connector}
            deleting={deleting}
            disableSuccessTimeout={disableSuccessTimeout}
            driveUrl={driveUrl}
            error={error}
            fields={fields}
            folderPath={folderPath}
            isUnloading={isUnloading}
            lastSync={lastSync}
            oAuthTerminated={oAuthTerminated}
            onCancel={() => this.cancel()}
            onDelete={() => this.deleteAccount()}
            onForceConnection={() => this.forceConnection()}
            onSubmit={(values) => this.connectAccount(Object.assign(values, {folderPath}))}
            submitting={submitting}
            success={success}
            />
          : <KonnectorInstall
            account={account}
            connector={connector}
            deleting={deleting}
            disableSuccessTimeout={disableSuccessTimeout}
            driveUrl={driveUrl}
            error={error}
            fields={fields}
            folderPath={folderPath}
            isTimeout={isTimeout}
            isUnloading={isUnloading}
            oAuthTerminated={oAuthTerminated}
            onAccountConfig={() => this.goToConfig()}
            onCancel={() => this.cancel()}
            onDelete={() => this.deleteAccount()}
            onSubmit={(values) => this.submit(Object.assign(values, {folderPath}))}
            submitting={submitting}
            success={success}
            />
        }

      </div>
    )
  }
}

export default AccountConnection
