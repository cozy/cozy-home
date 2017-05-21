import styles from '../styles/accountConnection'

import React, { Component } from 'react'
import statefulForm from '../lib/statefulForm'

import AccountLoginForm from './AccountLoginForm'
import DataItem from './DataItem'
import ReactMarkdown from 'react-markdown'

class AccountConnection extends Component {
  render () {
    const { t, connector, fields } = this.props
    const { customView, description } = connector
    return (
      <div className={styles['col-account-connection']}>
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
            <AccountLoginForm
              t={t}
              customView={customView}
              fields={fields}
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
