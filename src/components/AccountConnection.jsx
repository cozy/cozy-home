import styles from '../styles/accountConnection'

import React, { Component } from 'react'
import statefulForm from '../lib/statefulForm'

import AccountLoginForm from './AccountLoginForm'
import ReactMarkdown from 'react-markdown'

class AccountConnection extends Component {
  submit () {
    return this.props.connector && this.props.connector.oauth
         ? this.props.onOAuth(this.props.connector.slug)
         : this.props.submit()
  }

  render () {
    const { t, connector, dirty, fields, submitting, credentialsError } = this.props
    const { customView, description } = connector
    const securityIcon = require('../assets/icons/color/icon-cloud-lock.svg')
    return (
      <div>
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
          onSubmit={() => this.submit()}
        />
      </div>
    )
  }
}

export default statefulForm()(AccountConnection)
