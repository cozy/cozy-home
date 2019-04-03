import React from 'react'
import ClassNames from 'classnames'

import { translate } from 'cozy-ui/react/I18n'

import ReactMarkdownWrapper from 'components/ReactMarkdownWrapper'
import DataItem from 'components/DataItem'
import { getKonnectorMessage } from 'lib/konnectors'
import styles from 'styles/accountConnectionData'

const AccountConnectionData = ({ t, connector }) => {
  const hasDataTypes = !!(connector.data_types && connector.data_types.length)
  const serviceMessage = getKonnectorMessage(t, connector, 'service')
  return (
    <div className={ClassNames(styles['col-account-connection-data'])}>
      {serviceMessage && (
        <div>
          <h4>{t('account.config.data.service.description')}</h4>
          <p>
            <ReactMarkdownWrapper source={serviceMessage} />
          </p>
        </div>
      )}
      <h4>{t('account.config.data.title')}</h4>
      {hasDataTypes && (
        <ul className={styles['col-account-connection-data-access']}>
          {connector.data_types.map((data, index) => (
            <DataItem dataType={data} key={index} />
          ))}
        </ul>
      )}
      {!hasDataTypes && <p>{t('dataType.none', { name: connector.name })}</p>}
    </div>
  )
}

export default translate()(AccountConnectionData)
