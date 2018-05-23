import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import styles from '../styles/konnectorEdit'

import { Tab, Tabs, TabList, TabPanels, TabPanel } from 'cozy-ui/react/Tabs'

import AccountConnectionData from './AccountConnectionData'
import AccountLoginForm from './AccountLoginForm'
import AccountLogout from './AccountLogout'
import DescriptionContent from './DescriptionContent'
import KonnectorFolder from './KonnectorFolder'
import KonnectorMaintenance from './KonnectorMaintenance'
import KonnectorSync from './KonnectorSync'

import { isKonnectorLoginError } from '../lib/konnectors'
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
    allRequiredFieldsAreFilled,
    allRequiredFilledButPasswords,
    isValid,
    isValidButPasswords,
    dirty,
    driveUrl,
    error,
    fields,
    isFetching,
    isUnloading,
    lastSuccess,
    oAuthTerminated,
    folders,
    closeModal,
    onDelete,
    onForceConnection,
    onSubmit,
    submitting,
    trigger,
    maintenance,
    lang
  } = props

  const warningIcon = (
    <svg className={styles['item-status-icon']}>
      <use xlinkHref={`#${warningSvg.id}`} /> }
    </svg>
  )
  const hasLoginError = isKonnectorLoginError(error)
  const hasErrorExceptLogin = !!error && !hasLoginError
  const { hasDescriptions, editor } = connector
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
                <KonnectorMaintenance maintenance={maintenance} lang={lang} />
              )}
            <KonnectorSync
              frequency={connector.frequency || 'weekly'}
              lastSuccessDate={lastSuccess}
              maintenance={maintenance}
              submitting={submitting}
              onForceConnection={onForceConnection}
              trigger={trigger}
            />
            {account &&
              trigger &&
              account.auth.folderPath &&
              trigger.message.folder_to_save && (
                <KonnectorFolder
                  connector={connector}
                  isFetching={isFetching}
                  account={account}
                  driveUrl={driveUrl}
                  fields={fields}
                  trigger={trigger}
                  folders={folders}
                  closeModal={closeModal}
                />
              )}
          </TabPanel>

          <TabPanel
            name="account"
            className={styles['col-account-edit-tabpanel']}
          >
            <DescriptionContent
              title={t('account.config.title', { name: connector.name })}
              messages={
                hasDescriptions && hasDescriptions.connector
                  ? [t(`connector.${connector.slug}.description.connector`)]
                  : []
              }
            />

            {
              <AccountLoginForm
                connectorSlug={connector.slug}
                disableSuccessTimeout={disableSuccessTimeout}
                error={hasLoginError}
                fields={fields}
                dirty={dirty}
                forceEnabled={!!error}
                isOAuth={connector.oauth}
                isUnloading={isUnloading}
                oAuthTerminated={oAuthTerminated}
                onSubmit={onSubmit}
                submitting={submitting}
                isValid={isValid}
                allRequiredFieldsAreFilled={allRequiredFieldsAreFilled}
                isValidButPasswords={isValidButPasswords}
                allRequiredFilledButPasswords={allRequiredFilledButPasswords}
              />
            }

            {<AccountLogout deleting={deleting} onDelete={onDelete} />}
          </TabPanel>

          <TabPanel name="data" className={styles['col-account-edit-tabpanel']}>
            <AccountConnectionData connector={connector} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      {editor && (
        <p className={styles['col-account-connection-editor']}>
          {t('account.editor_detail', { editor })}
        </p>
      )}
    </div>
  )
}

export default translate()(KonnectorEdit)
