import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import styles from '../styles/accountConnection'

import { Tab, Tabs, TabList, TabPanels, TabPanel } from 'cozy-ui/react/Tabs'

import AccountConnectionData from './AccountConnectionData'
import AccountLoginForm from './AccountLoginForm'
import AccountLogout from './AccountLogout'
import KonnectorFolder from './KonnectorFolder'
import KonnectorSync from './KonnectorSync'

import { ACCOUNT_ERRORS } from '../lib/accounts'

export const KonnectorEdit = ({ t, account, connector, deleting, disableSuccessTimeout, driveUrl, error, fields, folderPath, isUnloading, lastSync, oAuthTerminated, onCancel, onDelete, onSubmit, submitting, success }) => {
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
            { !success && <KonnectorSync
              frequency={account && account.auth && account.auth.frequency}
              date={lastSync}
              submitting={submitting}
              onForceConnection={() => this.forceConnection()}
            /> }
            { !success && folderPath && <KonnectorFolder
              connector={connector}
              account={account}
              driveUrl={driveUrl}
            /> }
          </TabPanel>

          <TabPanel name='account'>
            { !error && !connector.oauth && <h4>{t('account.form.title')}</h4> }

            { !success && <AccountLoginForm
              connectorSlug={connector.slug}
              disableSuccessTimeout={disableSuccessTimeout}
              error={error && error.message === ACCOUNT_ERRORS.LOGIN_FAILED}
              fields={fields}
              forceEnabled={!!error}
              isOAuth={connector.oauth}
              isUnloading={isUnloading}
              oAuthTerminated={oAuthTerminated}
              onSubmit={onSubmit}
              submitting={submitting}
              values={account ? account.auth || account.oauth : {}}
            /> }

            { !success && <AccountLogout
              deleting={deleting}
              onDelete={onDelete}
            /> }
          </TabPanel>

          <TabPanel name='data'>
            <AccountConnectionData
              connector={connector}
            />
          </TabPanel>

        </TabPanels>

      </Tabs>
    </div>
  )
}

export default translate()(KonnectorEdit)
