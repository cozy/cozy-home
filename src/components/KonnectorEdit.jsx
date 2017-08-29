import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import styles from '../styles/accountConnection'

import { Tab, Tabs, TabList, TabPanels, TabPanel } from 'cozy-ui/react/Tabs'

export const KonnectorEdit = ({ t }) => {
  return (
    <div className={styles['col-account-connection-content']}>
      <Tabs initialActiveTab='sync'>

        <TabList>
          <Tab name='sync'>
            {t('account.config.tabs.sync')}
          </Tab>
          <Tab name='account'>
            {t('account.config.tabs.account')}
          </Tab>
          <Tab name='data'>
            {t('account.config.tabs.data')}
          </Tab>
        </TabList>

        <TabPanels>

          <TabPanel name='sync'>
            SYNCHRONIZATION
          </TabPanel>

          <TabPanel name='account'>
            ACCOUNT
          </TabPanel>

          <TabPanel name='data'>
            DATA
          </TabPanel>

        </TabPanels>

      </Tabs>
    </div>
  )
}

export default translate()(KonnectorEdit)
