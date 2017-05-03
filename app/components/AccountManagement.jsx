/** @jsx h */
import { h } from 'preact'
import TimeAgo from 'timeago-react'
import statefulForm from '../lib/statefulForm'

import AccountConfigForm from './AccountConfigForm'

const AccountManagement = (props) => {
  const { t, locale, accounts, selectedAccount, lastImport, dirty, submit, cancel } = props
  const { submitting, synching, deleting } = props
  const { selectAccount, addAccount, synchronize, deleteAccount } = props
  const isLoginFilled = !!props.values.login
  return (
    <div>
      <div class='account-management'>
        <div class='account-list'>
          <ul>
            {accounts.map((account, key) => (
              <li class={selectedAccount === key ? 'selected' : ''}>
                <a onClick={() => selectAccount(key)}>
                  {account.login
                    ? account.login
                    : t('my_accounts account index', {index: key + 1})}
                </a>
              </li>
            ))}
          </ul>
          <a className='add-button' onClick={() => addAccount()}>{t('my_accounts add_account button')}</a>
        </div>
        <div class='account-config'>
          <div>
            <h3>{t('my_accounts activity')}</h3>
            <p>
              {t('my_accounts activity desc')}
              {synching
                ? t('my_accounts activity running')
                : <TimeAgo datetime={lastImport} locale={locale} />
              }
            </p>
            <button class='flat' disabled={synching} onClick={() => synchronize()}>
              {t('my_accounts activity button')}
            </button>
          </div>
          <AccountConfigForm {...props} />
          {isLoginFilled
          ? <div>
            <h3>{t('my_accounts disconnect')}</h3>
            <p>
              {t('my_accounts disconnect desc')}
            </p>
            <button class='danger' disabled={deleting} onClick={() => deleteAccount(selectedAccount)}>
              {t('my_accounts disconnect button')}
            </button>
          </div>
          : <div>
            <button class='danger' disabled={deleting} onClick={() => deleteAccount(selectedAccount)}>
              {t('my_accounts delete button')}
            </button>
          </div>}

        </div>
      </div>
      <div class='account-management-controls'>
        <button class='cancel' onClick={cancel}>
          {t('my_accounts account cancel button')}
        </button>
        <button
          disabled={!dirty}
          aria-busy={submitting ? 'true' : 'false'}
          onClick={submit}
        >
          {t('my_accounts account save button')}
        </button>
      </div>
    </div>
  )
}

export default statefulForm()(AccountManagement)
