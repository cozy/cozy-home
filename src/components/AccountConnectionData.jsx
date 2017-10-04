import styles from '../styles/accountConnectionData'

import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import ClassNames from 'classnames'
import ReactMarkdownWrapper from '../components/ReactMarkdownWrapper'
import DataItem from '../components/DataItem'

const AccountConnectionData = ({ t, connector, hideMobile }) => {
  const {hasDescriptions} = connector
  const hasDataTypes = !!(connector.dataType && connector.dataType.length)

  return (
    <div className={ClassNames(styles['col-account-connection-data'], hideMobile ? styles['col-account-connection-data--desktop'] : '')}>
      { hasDescriptions && hasDescriptions.service &&
        <div>
          <h4>{t('account.config.data.service.description')}</h4>
          <p>
            <ReactMarkdownWrapper
              source={
                t(`connector.${connector.slug}.description.service`)
              }
            />
          </p>
        </div>
      }
      <h4>{t('account.config.data.title')}</h4>
      { hasDataTypes &&
        <ul className={styles['col-account-connection-data-access']}>
          {connector.dataType.map(data =>
            <DataItem
              dataType={data}
            />
          )}
        </ul>}
      { !hasDataTypes &&
        <p>{t('dataType.none', {name: connector.name})}</p>}
    </div>
  )
}

export default translate()(AccountConnectionData)
