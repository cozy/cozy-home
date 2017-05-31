import styles from '../styles/accountConnection'

import React, { Component } from 'react'

import AccountLoginForm from '../components/AccountLoginForm'
import DataItem from '../components/DataItem'
import ReactMarkdown from 'react-markdown'
import {popupCenter, waitForClosedPopup} from '../lib/popup'

import { ACCOUNT_ERRORS } from '../lib/accounts'

class AccountConnection extends Component {
  constructor (props, context) {
    super(props, context)
    this.store = this.context.store
  }

  connectAccount ({login, password, folderPath}) {
    const { connector } = this.props
    let { account } = this.props

    this.setState({ submitting: true })

    if (account) {
      return this.updateAccount(connector, account, {login: login, password: password})
    }

    account = {
      auth: {
        login: login,
        password: password
      }
    }

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
    waitForClosedPopup(newTab, `${accountType}_oauth`)
    .then(accountID => {
      this.terminateOAuth(accountID)
    })
    .catch(error => {
      this.setState({submitting: false, error: error.message})
    })
  }

  terminateOAuth (accountID) {
    const { t } = this.context
    const { slug } = this.props.connector

    this.store.fetchKonnectorInfos(slug)
      .then(konnector => {
        return this.store
          .fetchAccounts(slug, null)
          .then(accounts => {
            konnector.accounts = accounts
            const currentIdx = accounts.findIndex(a => a._id === accountID)
            const account = accounts[currentIdx]
            account.folderPath = account.folderPath || t('konnector default base folder', konnector)
            this.setState({connector: konnector})
            this.handleCreateSuccess(accounts[currentIdx])
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
    return this.store.connectAccount(this.props.connector, account, folderPath)
      .then(connection => {
        this.setState({ submitting: false })
        if (connection.error) {
          return Promise.reject(connection.error)
        }
      })
  }

  async updateAccount (connector, account, values) {
    account.auth.login = values.login
    account.auth.password = values.password

    this.setState({ submitting: true })

    return this.store.updateAccount(connector, account, values)
    .then(() => this.store.runAccount(connector, account))
    .then(() => this.handleUpdateSuccess(account))
    .catch(error => this.handleError(error))
  }

  deleteAccount () {
    const { account } = this.props
    this.setState({ deleting: true })
    this.store.deleteAccount(this.props.connector, account)
      .then(() => this.handleSuccess(account, [{message: 'account delete success'}]))
      .catch(error => this.handleError(error))
  }

  handleCreateSuccess (account) {
    const messages = [{message: 'account config success'}]

    if (account.folderPath) {
      messages.push({message: 'account config details', params: {folder: account.folderPath}})
    }

    this.handleSuccess(account, messages)
  }

  handleUpdateSuccess (account) {
    this.handleSuccess(account, [{message: 'account update success'}])
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
      this.props.onError(error)
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
    const { t, account, connector, dirty, fields } = this.props
    const { submitting, deleting, credentialsError } = this.state
    const { customView, description } = connector
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
            { account
              ? <h4>{t('account.connection.account.title')}</h4>
              : <div>
                <h3>{t('account.connection.title', { name: connector.name })}</h3>
                <p className={styles['col-account-connection-security']}>
                  <svg>
                    <use xlinkHref={securityIcon} />
                  </svg>
                  {t('account.connection.security')}
                </p>
              </div>
            }
            <AccountLoginForm
              t={t}
              konnector={connector}
              customView={customView}
              fields={fields}
              dirty={dirty}
              submitting={submitting}
              deleting={deleting}
              values={account ? account.auth : {}}
              error={credentialsError}
              onDelete={() => this.deleteAccount()}
              onSubmit={(values) => this.submit(Object.assign(values, {folderPath: t('konnector default base folder', connector)}))}
              onCancel={() => this.cancel()}
            />
          </div>
          <div className={styles['col-account-connection-data']}>
            { description &&
              <div>
                <h4>{t('account.connection.data.service.description')}</h4>
                <p>
                  <ReactMarkdown
                    source={
                      t(description)
                    }
                    renderers={{Link: props => <a href={props.href} target='_blank'>{props.children}</a>}}
                  />
                </p>
              </div>
            }
            <h4>{t('account.connection.data.title')}</h4>
            {connector.dataType &&
              <ul className={styles['col-account-connection-data-access']}>
                {connector.dataType.map(data =>
                  <DataItem
                    dataType={data}
                    hex={connector.color.hex}
                  />
                )}
              </ul>}
            {!connector.dataType &&
              <p>{t('dataType.none', {name: connector.name})}</p>}
          </div>
        </div>
      </div>
    )
  }
}

export default AccountConnection
