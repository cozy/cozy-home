import styles from '../styles/accountConnection'

import React, { Component } from 'react'
import statefulForm from '../lib/statefulForm'

import AccountLoginForm from './AccountLoginForm'
import DataItem from './DataItem'
import ReactMarkdown from 'react-markdown'

class AccountConnection extends Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      submitting: false
    }
  }

  submit () {
    this.setState({
      submitting: true
    })

    return this.props.connector && this.props.connector.oauth
         ? this.props.onOAuth(this.props.connector.slug)
         : this.props.submit()
          .catch(error => this.setState({submitting: false, error: error.message}))
  }

  // TODO: use a better helper
  getIcon (konnector) {
    try {
      return require(`../assets/icons/konnectors/${konnector.slug}.svg`)
    } catch (error) {
      console.warn(error.message)
      return require('../assets/icons/konnectors/default.svg')
    }
  }

  render () {
    const { t, connector, dirty, fields } = this.props
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
              onSubmit={() => this.submit()}
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

export default statefulForm()(AccountConnection)
