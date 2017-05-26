import styles from '../styles/accountConnection'

import React, { Component } from 'react'

import AccountLoginForm from '../components/AccountLoginForm'
import DataItem from '../components/DataItem'
import ReactMarkdown from 'react-markdown'
import Notifier from '../components/Notifier'

import { ACCOUNT_ERRORS } from '../lib/accounts'

class AccountConnection extends Component {
  constructor (props, context) {
    super(props, context)
    this.store = this.context.store
  }

  connectAccount ({login, password, folderPath}) {
    const account = {
      auth: {
        login: login,
        password: password
      }
    }

    this.setState({ submitting: true })

    return this.runConnection(account, folderPath)
      .catch(error => this.handleError(error))
  }

  runConnection (account, folderPath) {
    const { t } = this.context
    return this.store.connectAccount(this.props.connector, account, folderPath)
      .then(connection => {
        this.setState({ submitting: false })
        if (connection.error) {
          this.setState({ error: connection.error.message })
        } else {
          this.gotoParent()
          if (folderPath) {
            Notifier.info(t('account config success'), t('account config details') + folderPath)
          } else {
            Notifier.info(t('account config success'))
          }
        }
      })
  }

  handleError (error) {
    const stateUpdate = {
      submitting: false
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
         ? this.props.onOAuth(this.props.connector.slug)
         : this.connectAccount(values)
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
    const { t, connector, dirty, fields, credentialsError } = this.props
    const { submitting } = this.state
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
            <h3>{t('account.connection.title', { name: connector.name })}</h3>
            <p>{t('account.connection.description', { name: connector.name })}</p>
            <p>
              <ReactMarkdown
                source={
                  t(description)
                }
                renderers={{Link: props => <a href={props.href} target='_blank'>{props.children}</a>}}
              />
            </p>
            <p className={styles['col-account-connection-security']}>
              <svg>
                <use xlinkHref={securityIcon} />
              </svg>
              {t('account.connection.security')}
            </p>
            <AccountLoginForm
              t={t}
              konnector={connector}
              customView={customView}
              fields={fields}
              dirty={dirty}
              submitting={submitting}
              error={credentialsError}
              onSubmit={(values) => this.submit(Object.assign(values, {folderPath: t('konnector default base folder', connector)}))}
            />
          </div>
          <div className={styles['col-account-connection-data']}>
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
