import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import styles from '../styles/konnectorInstall'

import AccountLoginForm from './AccountLoginForm'
import DescriptionContent from './DescriptionContent'
import KonnectorMaintenance from './KonnectorMaintenance'
import KonnectorSuccess from './KonnectorSuccess'

import { getKonnectorMessage, isKonnectorLoginError } from '../lib/konnectors'
import ErrorDescription from './ErrorDescriptions'

import securityIcon from '../assets/icons/color/icon-cloud-lock.svg'

export const KonnectorInstall = props => {
  const {
    t,
    account,
    connector,
    disableSuccessTimeout,
    driveUrl,
    error,
    fields,
    queued,
    isUnloading,
    oAuthTerminated,
    onCancel,
    onDone,
    onSubmit,
    submitting,
    success,
    successMessage,
    successMessages,
    trigger,
    allRequiredFieldsAreFilled,
    displayAdvanced,
    toggleAdvanced,
    isFetching,
    isValid,
    isSuccess,
    dirty,
    successButtonLabel,
    maintenance,
    lang
  } = props
  const { editor } = connector
  const hasLoginError = isKonnectorLoginError(error)
  const hasErrorExceptLogin = !!error && !hasLoginError
  const isRunningInQueue = queued && submitting

  return (
    <div className={styles['col-account-connection-content']}>
      <div className={styles['col-account-connection-form']}>
        {hasErrorExceptLogin && ErrorDescription({ t, error, connector })}
        {(!error || hasLoginError) &&
          !isRunningInQueue &&
          !success &&
          !maintenance && (
            <DescriptionContent
              title={t('account.config.title', { name: connector.name })}
              messages={[getKonnectorMessage(t, connector, 'terms')]}
            >
              {!connector.oauth &&
                !error && (
                  <p className={styles['col-account-connection-security']}>
                    <svg>
                      <use xlinkHref={`#${securityIcon.id}`} />
                    </svg>
                    {connector.partner
                      ? t('account.config.security_third_party')
                      : t('account.config.security')}
                  </p>
                )}
            </DescriptionContent>
          )}
        {maintenance && maintenance.longTerm ? (
          <KonnectorMaintenance maintenance={maintenance} lang={lang} />
        ) : !account || !success || hasLoginError ? (
          <AccountLoginForm
            connectorSlug={connector.slug}
            konnectorName={connector.name}
            disableSuccessTimeout={disableSuccessTimeout}
            error={hasLoginError}
            fields={fields}
            isValid={isValid}
            dirty={dirty}
            isSuccess={isSuccess}
            isFetching={isFetching}
            forceEnabled={!!error}
            isOAuth={connector.oauth}
            isUnloading={isUnloading}
            oAuthTerminated={oAuthTerminated}
            onSubmit={onSubmit}
            submitting={submitting}
            allRequiredFieldsAreFilled={allRequiredFieldsAreFilled}
            displayAdvanced={displayAdvanced}
            toggleAdvanced={toggleAdvanced}
          />
        ) : (
          <KonnectorSuccess
            connector={connector}
            error={error}
            account={account}
            driveUrl={driveUrl}
            folderId={trigger && trigger.message.folder_to_save}
            isRunningInQueue={isRunningInQueue}
            isUnloading={isUnloading}
            onDone={onDone}
            onCancel={onCancel}
            success={success}
            title={successMessage}
            messages={successMessages}
            successButtonLabel={successButtonLabel}
          />
        )}
        {!isFetching &&
          editor && (
            <p className={styles['col-account-connection-editor']}>
              {t('account.editor_detail', { editor })}
            </p>
          )}
      </div>
    </div>
  )
}

export default translate()(KonnectorInstall)
