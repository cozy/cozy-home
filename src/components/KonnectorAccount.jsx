import styles from '../styles/accountConnection'

import React from 'react'
import { translate } from '../plugins/i18n'

import AccountLoginForm from './AccountLoginForm'
import DescriptionContent from './DescriptionContent'

import { ACCOUNT_ERRORS } from '../lib/accounts'

export const KonnectorAccount = ({ t, connector, account, fields, editing, disableSuccessTimeout, oAuthTerminated, isUnloading, submitting, deleting, error, onDelete, onSubmit, onCancel }) => {
  const { hasDescriptions } = connector
  const securityIcon = require('../assets/icons/color/icon-cloud-lock.svg')

  return (
    <div>
      { !error && editing && !connector.oauth && <h4>{t('account.form.title')}</h4> }

      { !error && !editing && <DescriptionContent
        title={t('account.config.title', { name: connector.name })}
        messages={hasDescriptions && hasDescriptions.connector
          ? [t(`connector.${connector.slug}.description.connector`)]
          : []}
      >
        { !connector.oauth && <p className={styles['col-account-connection-security']}>
          <svg>
            <use xlinkHref={securityIcon} />
          </svg>
          {t('account.config.security')}
        </p> }
      </DescriptionContent> }

      <AccountLoginForm
        connectorSlug={connector.slug}
        isOAuth={connector.oauth}
        oAuthTerminated={oAuthTerminated}
        isUnloading={isUnloading}
        fields={fields}
        submitting={submitting}
        disableSuccessTimeout={disableSuccessTimeout}
        deleting={deleting}
        values={editing && account ? account.auth || account.oauth : {}}
        error={error && error.message === ACCOUNT_ERRORS.LOGIN_FAILED}
        forceEnabled={!!error}
        onDelete={onDelete}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </div>
  )
}

export default translate()(KonnectorAccount)
