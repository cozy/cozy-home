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
import { getAccountName } from '../lib/helpers'

const KnownErrorDescription = ({ t, connector, errorMessage }) => (
  <DescriptionContent
    cssClassesObject={{ 'coz-error': true }}
    title={t(`connection.error.${errorMessage}.title`)}
    messages={[
      t(`connection.error.${errorMessage}.description`, {
        name: connector.name,
        link: connector.vendorLink
      })
    ]}
  />
)

const GlobalErrorDescription = ({ t, connector }) => (
  <DescriptionContent
    cssClassesObject={{ 'coz-error': true }}
    title={t('connection.error.default.title')}
    messages={[
      t('connection.error.default.description', { name: connector.name })
    ]}
  />
)

const getErrorDescription = props => {
  const { error } = props
  switch (error.message) {
    case ACCOUNT_ERRORS.NOT_EXISTING_DIRECTORY:
    case ACCOUNT_ERRORS.USER_ACTION_NEEDED:
      return <KnownErrorDescription errorMessage={error.message} {...props} />
    default:
      return <GlobalErrorDescription {...props} />
  }
}

export const KonnectorEdit = ({
  t,
  account,
  connector,
  deleting,
  disableSuccessTimeout,
  allRequiredFieldsAreFilled,
  isValid,
  dirty,
  driveUrl,
  error,
  fields,
  folderPath,
  editing,
  isFetching,
  isUnloading,
  lastExecution,
  oAuthTerminated,
  folders,
  closeModal,
  onCancel,
  onDelete,
  onForceConnection,
  onSubmit,
  submitting,
  success,
  trigger
}) => {
  const warningIcon = (
    <svg className="item-status-icon">
      <use xlinkHref={require('../assets/sprites/icon-warning.svg')} /> }
    </svg>
  )
  const hasLoginError = error && error.message === ACCOUNT_ERRORS.LOGIN_FAILED
  const hasErrorExceptLogin =
    error && error.message !== ACCOUNT_ERRORS.LOGIN_FAILED
  const { hasDescriptions, editor } = connector
  // assign accountName placeholder
  if (fields.accountName)
    fields.accountName.placeholder = getAccountName(account)
  if (account && account.oauth)
    account.auth = Object.assign({}, account.auth, account.oauth)

  return (
    <div className={styles['col-account-edit-content']}>
      {hasErrorExceptLogin && getErrorDescription({ t, error, connector })}

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
            <KonnectorSync
              frequency="week" // hardcoded until further implementation
              lastSyncDate={lastExecution}
              submitting={submitting}
              onForceConnection={onForceConnection}
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
            {!error && !connector.oauth && <h4>{t('account.form.title')}</h4>}

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
                editing={editing}
                forceEnabled={!!error}
                isOAuth={connector.oauth}
                isUnloading={isUnloading}
                oAuthTerminated={oAuthTerminated}
                onSubmit={onSubmit}
                submitting={submitting}
                isValid={isValid}
                allRequiredFieldsAreFilled={allRequiredFieldsAreFilled}
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
