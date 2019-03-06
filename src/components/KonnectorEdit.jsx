import React from 'react'
import flag from 'cozy-flags'
import { TriggerManager } from 'cozy-harvest-lib'
import { translate } from 'cozy-ui/react/I18n'
import has from 'lodash/has'
import styles from '../styles/konnectorEdit'

import { Tab, Tabs, TabList, TabPanels, TabPanel } from 'cozy-ui/react/Tabs'

import AccountConnectionData from './AccountConnectionData'
import AccountLoginForm from './AccountLoginForm'
import AccountLogout from './AccountLogout'
import DescriptionContent from './DescriptionContent'
import TriggerFolderLink from './TriggerFolderLink'
import KonnectorMaintenance from './KonnectorMaintenance'
import KonnectorSync from './KonnectorSync'

import { getKonnectorMessage, isKonnectorLoginError } from '../lib/konnectors'
import { getAccountName } from '../lib/helpers'
import ErrorDescription from './ErrorDescriptions'

import warningSvg from '../assets/sprites/icon-warning.svg'

export const KonnectorEdit = props => {
  const {
    t,
    account,
    connector,
    deleting,
    disableSuccessTimeout,
    displayAdvanced,
    allRequiredFieldsAreFilled,
    allRequiredFilledButPasswords,
    isValid,
    isValidButPasswords,
    dirty,
    error,
    fields,
    isUnloading,
    lastSuccess,
    oAuthTerminated,
    onDelete,
    onDone,
    onForceConnection,
    onLoginSuccess,
    onSubmit,
    submitting,
    toggleAdvanced,
    trigger,
    maintenance,
    lang
  } = props

  const warningIcon = (
    <svg className={styles['item-status-icon']}>
      <use xlinkHref={`#${warningSvg.id}`} />
    </svg>
  )
  const hasLoginError = isKonnectorLoginError(error)
  const hasErrorExceptLogin = !!error && !hasLoginError
  // assign accountName placeholder
  if (fields.accountName)
    fields.accountName.placeholder = getAccountName(account)
  if (account && account.oauth)
    account.auth = Object.assign({}, account.auth, account.oauth)

  return (
    <div className={styles['col-account-edit-content']}>
      {!maintenance &&
        hasErrorExceptLogin &&
        ErrorDescription({ t, error, connector })}

      <Tabs
        initialActiveTab={hasLoginError ? 'account' : 'sync'}
        className={styles['col-account-edit-tabs']}
      >
        <TabList>
          <Tab name="sync" className={styles['col-account-edit-tab']}>
            {t('account.config.tabs.sync')}
            {hasErrorExceptLogin && warningIcon}
          </Tab>
          <Tab name="account" className={styles['col-account-edit-tab']}>
            {t('account.config.tabs.account')}
            {hasLoginError && warningIcon}
          </Tab>
          <Tab name="data" className={styles['col-account-edit-tab']}>
            {t('account.config.tabs.data')}
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel name="sync" className={styles['col-account-edit-tabpanel']}>
            {maintenance &&
              maintenance.longTerm && (
                <KonnectorMaintenance
                  maintenance={maintenance}
                  lang={lang}
                  konnectorName={connector.name}
                />
              )}
            <KonnectorSync
              frequency={connector.frequency || 'weekly'}
              lastSuccessDate={lastSuccess}
              maintenance={maintenance}
              submitting={submitting}
              onForceConnection={onForceConnection}
              trigger={trigger}
            />
            {has(trigger, 'message.folder_to_save') && (
              <DescriptionContent
                title={t('account.folder.withoutSettings.title')}
              >
                <TriggerFolderLink
                  folderId={trigger.message.folder_to_save}
                  label={t('account.folder.link')}
                />
              </DescriptionContent>
            )}
          </TabPanel>

          <TabPanel
            name="account"
            className={styles['col-account-edit-tabpanel']}
          >
            <DescriptionContent
              title={t('account.config.title', { name: connector.name })}
              messages={[getKonnectorMessage(t, connector, 'terms')]}
            />

            {flag('harvest') ? (
              <TriggerManager
                account={account}
                konnector={connector}
                trigger={trigger}
                onDone={onDone}
                onLoginSuccess={onLoginSuccess}
                running={submitting}
              />
            ) : (
              <AccountLoginForm
                account={account}
                connectorSlug={connector.slug}
                disableSuccessTimeout={disableSuccessTimeout}
                error={hasLoginError}
                editing
                fields={fields}
                dirty={dirty}
                displayAdvanced={displayAdvanced}
                forceEnabled={!!error}
                isOAuth={connector.oauth}
                isUnloading={isUnloading}
                oAuthTerminated={oAuthTerminated}
                onSubmit={onSubmit}
                submitting={submitting}
                toggleAdvanced={toggleAdvanced}
                isValid={isValid}
                allRequiredFieldsAreFilled={allRequiredFieldsAreFilled}
                isValidButPasswords={isValidButPasswords}
                allRequiredFilledButPasswords={allRequiredFilledButPasswords}
              />
            )}

            {<AccountLogout deleting={deleting} onDelete={onDelete} />}
          </TabPanel>

          <TabPanel name="data" className={styles['col-account-edit-tabpanel']}>
            <AccountConnectionData connector={connector} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}

export default translate()(KonnectorEdit)
