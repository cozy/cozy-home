import styles from '../styles/accountConnection'

import React, { Component } from 'react'

import AccountLoginForm from '../components/AccountLoginForm'
import DataItem from '../components/DataItem'
import ReactMarkdownWrapper from '../components/ReactMarkdownWrapper'
import {popupCenter, waitForClosedPopup} from '../lib/popup'

import { ACCOUNT_ERRORS } from '../lib/accounts'

class AccountConnection extends Component {
  constructor (props, context) {
    super(props, context)
    this.store = this.context.store
    this.state = {
      account: this.props.existingAccount
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
      .then(() => this.handleCreateSuccess(account))
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
          .fetchAccounts(slug, null)
          .then(accounts => {
            konnector.accounts = accounts
            const currentIdx = accounts.findIndex(a => a._id === accountID)
            const account = accounts[currentIdx]
            this.setState({account: account})
            account.folderPath = account.folderPath || t('account.config.default_folder', konnector)
            return this.runConnection(accounts[currentIdx], account.folderPath)
              .then(() => {
                this.setState({
                  connector: konnector,
                  isConnected: konnector.accounts.length !== 0,
                  selectedAccount: currentIdx,
                  submitting: false
                })
                this.handleCreateSuccess(accounts[currentIdx])
              })
          })
          .catch(error => this.handleError(error))
      })
  }

  runConnection (account, folderPath) {
    this.setState({ submitting: true })

    return this.store.connectAccount(this.props.connector, account, folderPath)
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
          return Promise.resolve(connection.account)
        }
      })
  }

  updateAccount (connector, account, values) {
    Object.assign(account.auth, values)

    this.setState({ submitting: true })

    return this.store.updateAccount(connector, account, values)
    .then(account => {
      this.setState({ account: account })
      return this.store.runAccount(connector, account)
    })
    .then(() => this.handleUpdateSuccess(account))
    .catch(error => this.handleError(error))
  }

  deleteAccount () {
    const { account } = this.state
    this.setState({ deleting: true })
    this.store.deleteAccount(this.props.connector, account)
      .then(() => this.handleSuccess(account, [{message: 'account.message.success.delete'}]))
      .catch(error => this.handleError(error))
  }

  handleCreateSuccess (account) {
    const messages = [{message: 'account.message.success.config'}]

    if (account.folderPath) {
      messages.push({message: 'account.message.details', params: {folder: account.folderPath}})
    }

    if (this.props.connector.additionnalSuccessMessage) {
      messages.push(
        {
          message: this.props.connector.additionnalSuccessMessage.message || ''
        }
      )
    }
    this.handleSuccess(account, messages)
  }

  handleUpdateSuccess (account) {
    const messages = [{message: 'account update success'}]
    if (this.props.connector.additionnalSuccessMessage) {
      messages.push(
        {
          message: this.props.connector.additionnalSuccessMessage.message || ''
        }
      )
    }
    this.handleSuccess(account, messages)
  }

  handleSuccess (account, messages = []) {
    this.setState({
      submitting: false,
      deleting: false
    })

    this.props.onSuccess(account, messages)
  }

  handleError (error) {
    const stateUpdate = {
      submitting: false,
      deleting: false
    }

    if (error.message === ACCOUNT_ERRORS.LOGIN_FAILED) {
      stateUpdate.credentialsError = error
    } else {
      stateUpdate.error = error
    }

    this.setState(stateUpdate)
  }

  submit (values) {
    return this.props.connector && this.props.connector.oauth
         ? this.connectAccountOAuth(this.props.connector.slug)
         : this.connectAccount(values)
  }

  cancel () {
    this.props.onCancel()
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
    const { t, existingAccount, connector, fields } = this.props
    const { submitting, deleting, error, credentialsError } = this.state
    const { description } = connector
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
            { error
              ? <div className='coz-error'>
                <h4>{t('account.message.error.global.title')}</h4>
                <p>
                  <ReactMarkdownWrapper
                    source={t('account.message.error.global.description', {name: connector.name, forum: t('account.message.forum')})}
                  />
                </p>
              </div>

              : existingAccount
                ? !connector.oauth && <h4>{t('account.form.title')}</h4>
                : <div>
                  <h3>{t('account.config.title', { name: connector.name })}</h3>
                  <p className={styles['col-account-connection-security']}>
                    <svg>
                      <use xlinkHref={securityIcon} />
                    </svg>
                    {t('account.config.security')}
                  </p>
                </div>
            }
            <AccountLoginForm
              t={t}
              connectorSlug={connector.slug}
              isOAuth={connector.oauth}
              fields={fields}
              submitting={submitting}
              deleting={deleting}
              values={existingAccount ? existingAccount.auth || existingAccount.oauth : {}}
              error={credentialsError}
              forceEnabled={!!error}
              onDelete={() => this.deleteAccount()}
              onSubmit={(values) => this.submit(Object.assign(values, {folderPath: t('account.config.default_folder', connector)}))}
              onCancel={() => this.cancel()}
            />
          </div>
          <div className={styles['col-account-connection-data']}>
            { description &&
              <div>
                <h4>{t('account.config.data.service.description')}</h4>
                <p>
                  <ReactMarkdownWrapper
                    source={
                      t(description)
                    }
                  />
                </p>
              </div>
            }
            <h4>{t('account.config.data.title')}</h4>
            {connector.dataType &&
              <ul className={styles['col-account-connection-data-access']}>
                {connector.dataType.map(data =>
                  <DataItem
                    dataType={data}
                    hex={connector.color.hex}
                  />
                )}
              </ul>}
            {!(connector.dataType && connector.dataType.length) &&
              <p>{t('dataType.none', {name: connector.name})}</p>}
          </div>
        </div>
      </div>
    )
  }
}

export default AccountConnection
