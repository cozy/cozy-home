import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import styles from '../styles/konnectorEdit'

import { Tab, Tabs, TabList, TabPanels, TabPanel } from 'cozy-ui/react/Tabs'

import AccountConnectionData from './AccountConnectionData'
import AccountLoginForm from './AccountLoginForm'
import AccountLogout from './AccountLogout'
import DescriptionContent from './DescriptionContent'
import KonnectorFolder from './KonnectorFolder'
import KonnectorSync from './KonnectorSync'

import { ACCOUNT_ERRORS } from '../lib/accounts'

export const KonnectorEdit = ({ t, account, connector, deleting, disableSuccessTimeout, driveUrl, error, fields, folderPath, isUnloading, lastSync, oAuthTerminated, onCancel, onDelete, onForceConnection, onSubmit, submitting, success }) => {
  const warningIcon = <svg className='item-status-icon'>
    <use xlinkHref={require('../assets/sprites/icon-warning.svg')} /> }
  </svg>
  const hasLoginError = error && error.message === ACCOUNT_ERRORS.LOGIN_FAILED
  const hasErrorExceptLogin = error && error.message !== ACCOUNT_ERRORS.LOGIN_FAILED

  return (
    <div className={styles['col-account-edit-content']}>

      { hasErrorExceptLogin && <DescriptionContent
        cssClassesObject={{'coz-error': true}}
        title={t('account.message.error.global.title')}
        messages={[t('account.message.error.global.description', {name: connector.name})]}
      /> }

      <Tabs
        initialActiveTab={
          hasLoginError
          ? 'account'
          : 'sync'
        }
        className={styles['col-account-edit-tabs']}
      >

        <TabList>
          <Tab name='sync'>
            {t('account.config.tabs.sync')}
            { hasErrorExceptLogin && warningIcon}
          </Tab>
          <Tab name='account'>
            {t('account.config.tabs.account')}
            { hasLoginError && warningIcon }
          </Tab>
          <Tab name='data'>
            {t('account.config.tabs.data')}
          </Tab>
        </TabList>

        <TabPanels>

          <TabPanel name='sync' className={styles['col-account-edit-tabpanel']}>
            { !success && <KonnectorSync
              frequency={account && account.auth && account.auth.frequency}
              date={lastSync}
              submitting={submitting}
              onForceConnection={onForceConnection}
            /> }
            { !success && folderPath && <KonnectorFolder
              connector={connector}
              account={account}
              driveUrl={driveUrl}
            /> }
          </TabPanel>

          <TabPanel name='account' className={styles['col-account-edit-tabpanel']}>
            { !error && !connector.oauth && <h4>{t('account.form.title')}</h4> }

            { !success && <AccountLoginForm
              connectorSlug={connector.slug}
              disableSuccessTimeout={disableSuccessTimeout}
              error={hasLoginError}
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

          <TabPanel name='data' className={styles['col-account-edit-tabpanel']}>
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
