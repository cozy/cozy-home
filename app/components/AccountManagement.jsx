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
                    : t('data_connect account index', {index: key + 1})}
                </a>
              </li>
            ))}
          </ul>
          <a className='add-button' onClick={() => addAccount()}>{t('data_connect add_account button')}</a>
        </div>
        <div class='account-config'>
          <div>
            <h3>{t('data_connect activity')}</h3>
            <p>
              {t('data_connect activity desc')}
              {synching
                ? t('data_connect activity running')
                : lastImport && <TimeAgo datetime={lastImport} locale={locale} />
              }
            </p>
            <button class='flat' disabled={synching} onClick={() => synchronize()}>
              {t('data_connect activity button')}
            </button>
          </div>
          <AccountConfigForm {...props} />
          {isLoginFilled
          ? <div>
            <h3>{t('data_connect disconnect')}</h3>
            <p>
              {t('data_connect disconnect desc')}
            </p>
            <button class='danger' disabled={deleting} onClick={() => deleteAccount(selectedAccount)}>
              {t('data_connect disconnect button')}
            </button>
          </div>
          : <div>
            <button class='danger' disabled={deleting} onClick={() => deleteAccount(selectedAccount)}>
              {t('data_connect delete button')}
            </button>
          </div>}

        </div>
      </div>
      <div class='account-management-controls'>
        <button class='cancel' onClick={cancel}>
          {t('data_connect account cancel button')}
        </button>
        <button
          disabled={!dirty}
          aria-busy={submitting ? 'true' : 'false'}
          onClick={submit}
        >
          {t('data_connect account save button')}
        </button>
      </div>
    </div>
  )
}

export default statefulForm()(AccountManagement)
