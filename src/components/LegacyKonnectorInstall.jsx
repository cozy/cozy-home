import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import styles from '../styles/konnectorInstall'

import AccountLoginForm from './AccountLoginForm'
import DescriptionContent from './DescriptionContent'

import { getKonnectorMessage, isKonnectorLoginError } from '../lib/konnectors'
import ErrorDescription from './ErrorDescriptions'

export const KonnectorInstall = props => {
  const {
    t,
    connector,
    disableSuccessTimeout,
    error,
    fields,
    queued,
    isUnloading,
    oAuthTerminated,
    onSubmit,
    submitting,
    success,
    allRequiredFieldsAreFilled,
    displayAdvanced,
    toggleAdvanced,
    isFetching,
    isValid,
    dirty
  } = props
  const hasLoginError = isKonnectorLoginError(error)
  const hasErrorExceptLogin = !!error && !hasLoginError
  const isRunningInQueue = queued && submitting

  return (
    <div className={styles['col-account-connection-content']}>
      <div className={styles['col-account-connection-form']}>
        {hasErrorExceptLogin && ErrorDescription({ t, error, connector })}
        {(!error || hasLoginError) &&
          !isRunningInQueue &&
          !success && (
            <DescriptionContent
              title={t('account.config.title', { name: connector.name })}
              messages={[getKonnectorMessage(t, connector, 'terms')]}
              centerTitle
            />
          )}
        <AccountLoginForm
          connectorSlug={connector.slug}
          konnectorName={connector.name}
          disableSuccessTimeout={disableSuccessTimeout}
          error={hasLoginError}
          fields={fields}
          isValid={isValid}
          dirty={dirty}
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
      </div>
    </div>
  )
}

export default translate()(KonnectorInstall)
