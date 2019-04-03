import React from 'react'

import { translate } from 'cozy-ui/react/I18n'

import DescriptionContent from 'components/DescriptionContent'
import ErrorDescription from 'components/ErrorDescriptions'
import LegacyAccountLoginForm from 'components/LegacyAccountLoginForm'
import { getKonnectorMessage, isKonnectorLoginError } from 'lib/konnectors'

import styles from 'styles/konnectorInstall'

export const LegacyKonnectorInstall = props => {
  const {
    t,
    connector,
    error,
    queued,
    oAuthTerminated,
    onSubmit,
    submitting,
    success
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
        <LegacyAccountLoginForm
          error={hasLoginError}
          oAuthTerminated={oAuthTerminated}
          onSubmit={onSubmit}
          submitting={submitting}
        />
      </div>
    </div>
  )
}

export default translate()(LegacyKonnectorInstall)
