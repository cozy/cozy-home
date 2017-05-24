import React from 'react'

import AccountLoginForm from './AccountLoginForm'

const AccountConfigForm = ({ t, customView, fields, dirty, error, submit, submitting, connector }) => (
  <div className={'account-form' + (error ? ' error' : '')}>
    <AccountLoginForm
      t={t}
      customView={customView}
      fields={fields}
      konnector={connector}
    />
    {error === 'bad credentials' &&
      <p className='errors'>{t('account config bad credentials')}</p>
    }
  </div>
)

export default AccountConfigForm
