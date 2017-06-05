import styles from '../styles/accountConnection'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import DataItem from '../components/DataItem'

const AccountConnectionData = ({ t, connector }) => {
  const {description} = connector

  return (
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
  )
}

export default AccountConnectionData
