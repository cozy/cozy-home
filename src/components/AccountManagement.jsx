import React from 'react'
import statefulForm from '../lib/statefulForm'

import AccountConfigForm from './AccountConfigForm'

const AccountManagement = (props) => {
  const { t, accounts, selectedAccount, dirty, submit, cancel } = props
  const { submitting, deleting } = props
  const { deleteAccount } = props
  const isLoginFilled = !!props.values.login || !!props.values.access_token
  return (
    <div>
      <div className='account-management'>
        <div className='account-config'>
          <AccountConfigForm {...props} />
          {isLoginFilled
          ? <div>
            <h3>{t('disconnect')}</h3>
            <p>
              {t('disconnect desc')}
            </p>
            <button className='danger' disabled={deleting} onClick={() => deleteAccount(accounts[selectedAccount])}>
              {t('disconnect button')}
            </button>
          </div>
          : <div>
            <button className='danger' disabled={deleting} onClick={() => deleteAccount(accounts[selectedAccount])}>
              {t('delete button')}
            </button>
          </div>}

        </div>
      </div>
      <div className='account-management-controls'>
        <button className='cancel' onClick={cancel}>
          {t('account cancel button')}
        </button>
        <button
          disabled={!dirty}
          aria-busy={submitting ? 'true' : 'false'}
          onClick={submit}
        >
          {t('account save button')}
        </button>
      </div>
    </div>
  )
}

export default statefulForm()(AccountManagement)
