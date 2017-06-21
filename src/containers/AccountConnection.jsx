import styles from '../styles/accountConnection'

import React, { Component } from 'react'

import AccountLoginForm from '../components/AccountLoginForm'
import AccountConnectionData from '../components/AccountConnectionData'
import DescriptionContent from '../components/DescriptionContent'
import {popupCenter, waitForClosedPopup} from '../lib/popup'

import { ACCOUNT_ERRORS } from '../lib/accounts'

const SUCCESS_TYPES = {
  UPDATE: 'update',
  CONNECT: 'connect',
  TIMEOUT: 'timeout'
}

class AccountConnection extends Component {
  constructor (props, context) {
    super(props, context)
    this.store = this.context.store
    this.state = {
      account: this.props.existingAccount,
      editing: !!this.props.existingAccount,
      success: null
    }

    if (this.props.error) this.handleError({message: this.props.error})
  }

  componentWillReceiveProps ({ existingAccount }) {
    this.setState({
      account: existingAccount
    })
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

  connectAccountOAuth (accountType) {
    this.setState({
      submitting: true
    })

    const cozyUrl =
      `${window.location.protocol}//${document.querySelector('[role=application]').dataset.cozyDomain}`
    const newTab = popupCenter(`${cozyUrl}/accounts/${accountType}/start?scope=openid+profile+offline_access&state=xxx&nonce=${Date.now()}`, `${accountType}_oauth`, 800, 800)
    return waitForClosedPopup(newTab, `${accountType}_oauth`)
    .then(accountID => {
      return this.terminateOAuth(accountID)
    })
    .catch(error => {
      this.setState({submitting: false, error: error.message})
    })
  }

  terminateOAuth (accountID) {
    const { t } = this.context
    const { slug } = this.props.connector

    return this.store.fetchKonnectorInfos(slug)
      .then(konnector => {
        return this.store
          .fetchAccounts(slug)
          .then(accounts => {
            konnector.accounts = accounts
            const currentIdx = accounts.findIndex(a => a._id === accountID)
            const account = accounts[currentIdx]
            this.setState({account: account})
            account.folderPath = account.folderPath || t('account.config.default_folder', konnector)
            return this.runConnection(accounts[currentIdx], account.folderPath)
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
    const { account } = this.state
    this.setState({ deleting: true })
    this.store.deleteAccount(this.props.connector, account)
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
    // when service usage
    if (this.props.onError) return this.props.onError(error)

    this.setState({
      submitting: false,
      deleting: false,
      error: error,
      success: null
    })
  }

  submit (values) {
    return this.props.connector && this.props.connector.oauth
         ? this.connectAccountOAuth(this.props.connector.slug)
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
      return require(`assets/icons/konnectors/${konnector.slug}.svg`)
    } catch (error) {
      console.warn(error.message)
      return require('assets/icons/konnectors/default.svg')
    }
  }

  render () {
    const { t, connector, fields } = this.props
    const { submitting, deleting, error, success, account, editing } = this.state
    const hasGlobalError = error && error.message !== ACCOUNT_ERRORS.LOGIN_FAILED
    const { hasDescriptions } = connector
    const securityIcon = require('../assets/icons/color/icon-cloud-lock.svg')
    return (
      <div className={styles['col-account-connection']}>
        <div className={styles['col-account-connection-header']}>
          <img
            className={styles['col-account-connection-icon']}
            src={this.getIcon(connector)} />
        </div>
        <div className={styles['col-account-connection-content']}>
          <div className={styles['col-account-connection-form']}>
            { hasGlobalError
              ? <DescriptionContent
                cssClassesObject={{'coz-error': true}}
                title={t('account.message.error.global.title')}
                messages={[t('account.message.error.global.description', {name: connector.name})]}
              />

              : account && editing && !success
                ? !connector.oauth &&
                  <h4>{t('account.form.title')}</h4>
                : !success && <DescriptionContent
                  title={t('account.config.title', { name: connector.name })}
                  messages={
                    (hasDescriptions && hasDescriptions.connector)
                    ? [t(`connector.${connector.slug}.description.connector`)]
                    : []
                  }
                >
                  {!connector.oauth &&
                    <p className={styles['col-account-connection-security']}>
                      <svg>
                        <use xlinkHref={securityIcon} />
                      </svg>
                      {t('account.config.security')}
                    </p>
                  }
                </DescriptionContent>
            }
            {success
              ? <div>
                <DescriptionContent
                  title={t(`account.success.title.${success.type}`, { name: connector.name })}
                  messages={success.messages}
                >
                  {Array.isArray(connector.dataType) && connector.dataType.includes('bill') &&
                    <p>
                      {t(`account.message.${success.type === SUCCESS_TYPES.TIMEOUT ? 'syncing' : 'synced'}.bill`, { name: connector.name })}
                      <br />
                      <span className={styles['col-account-success-highlighted-data']}>
                        {this.state.account.auth.folderPath}
                      </span>
                    </p>
                  }
                </DescriptionContent>
                <AccountLoginForm
                  onAccountConfig={() => this.goToConfig()}
                  onCancel={() => this.cancel()}
                  isSuccess={!!success}
                />
              </div>
              : <AccountLoginForm
                connectorSlug={connector.slug}
                isOAuth={connector.oauth}
                fields={fields}
                submitting={submitting}
                disableSuccessTimeout={this.props.disableSuccessTimeout}
                deleting={deleting}
                values={editing && account ? account.auth || account.oauth : {}}
                error={error && error.message === ACCOUNT_ERRORS.LOGIN_FAILED}
                forceEnabled={!!error}
                onDelete={() => this.deleteAccount()}
                onSubmit={(values) => this.submit(Object.assign(values, {folderPath: t('account.config.default_folder', connector)}))}
                onCancel={() => this.cancel()}
              />
            }
          </div>
          <AccountConnectionData
            connector={connector}
          />
        </div>
      </div>
    )
  }
}

export default AccountConnection
