import styles from '../styles/accountLoginForm'

import React from 'react'

import Field, { PasswordField, DropdownField, CheckboxField } from './Field'

const AccountLoginForm = ({ t, connector, customView, fields, error, dirty, submitting, onSubmit }) => (
  <div className={styles['account-form-login']}>
    {customView &&
      <div className='coz-custom-view'
        dangerouslySetInnerHTML={{
          __html: customView.replace(/<%t (.*) %>/gi, (match, $1) => t($1))
        }} />
    }
    {Object.keys(fields)
      .filter(name => !fields[name].advanced)
      .map(name => {
        if (fields[name].type === 'password') {
          return <PasswordField label={t(name)} {...fields[name]} />
        }
        if (fields[name].type === 'dropdown') {
          return <DropdownField label={t(name)} {...fields[name]} />
        }

        if (fields[name].type === 'checkbox') {
          return <CheckboxField label={t(name)} {...fields[name]} />
        }

        return <Field label={t(name)} {...fields[name]} />
      }
    )}
    <div>
      <button
        className='coz-button--primary'
        disabled={!dirty && !connector.oauth}
        aria-busy={submitting ? 'true' : 'false'}
        onClick={onSubmit}
      >
        {t('account.connection.login.submit')}
      </button>
      {error === 'bad credentials' &&
        <p className='errors'>{t('account.connection.login.error.bad_credentials')}</p>
      }
    </div>
  </div>
)

export default AccountLoginForm
