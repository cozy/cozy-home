import styles from '../styles/accountManagement'

import React from 'react'
import statefulForm from '../lib/statefulForm'
import classNames from 'classnames'

import AccountConfigForm from './AccountConfigForm'

const AccountManagement = (props) => {
  const { t, accounts, selectedAccount, dirty, submit, cancel } = props
  const { submitting, deleting } = props
  const { deleteAccount } = props
  const isLoginFilled = !!props.values.login || !!props.values.access_token
  return (
    <div>
      <AccountConfigForm {...props} />
      { isLoginFilled &&
        <div className={styles['account-management-disconnect']}>
          <h4>{t('account.management.disconnect.title')}</h4>
          <p>
            {t('account.management.disconnect.description')}
          </p>
          <div className={styles['account-management-controls']}>
            <button
              className={classNames('coz-btn', 'coz-btn--danger-outline', styles['coz-btn'])}
              disabled={deleting}
              onClick={() => deleteAccount(accounts[selectedAccount])}
            >
              {t('account.management.disconnect.button')}
            </button>
          </div>
        </div>
      }
      { !isLoginFilled &&
        <div className={styles['account-management-controls']}>
          <button
            className={classNames('coz-btn', 'coz-btn--danger-outline', styles['coz-btn'])}
            disabled={deleting}
            onClick={() => deleteAccount(accounts[selectedAccount])}
          >
            {t('delete button')}
          </button>
        </div>
      }
      <div className={styles['account-management-controls']}>
        <button
          className={classNames('coz-btn', 'coz-btn--secondary', styles['coz-btn'])}
          onClick={cancel}
        >
          {t('account cancel button')}
        </button>
        <button
          className={classNames('coz-btn', 'coz-btn--regular', styles['coz-btn'])}
          disabled={!dirty || submitting}
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
