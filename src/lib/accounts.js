/* accounts lib ready to be added to cozy-client-js */

import { KONNECTORS_RESULT_DOCTYPE } from './konnectors'

export const ACCOUNTS_DOCTYPE = 'io.cozy.accounts'

export const ACCOUNT_ERRORS = {
  LOGIN_FAILED: 'LOGIN_FAILED',
  MAINTENANCE: 'MAINTENANCE',
  NOT_EXISTING_DIRECTORY: 'NOT_EXISTING_DIRECTORY',
  SUCCESS_TIMEOUT: 'SUCCESS_TIMEOUT',
  USER_ACTION_NEEDED: 'USER_ACTION_NEEDED'
}

export function create(cozy, konnector, auth, folderID, name = '') {
  return cozy.data.create(ACCOUNTS_DOCTYPE, {
    name: name,
    account_type: konnector.slug,
    auth: auth,
    folderId: folderID
  })
}

export function update(cozy, account, newAccount) {
  return cozy.data.updateAttributes(ACCOUNTS_DOCTYPE, account.id, {
    auth: newAccount.auth
  })
}

export function _delete(cozy, account) {
  return cozy.data.delete(ACCOUNTS_DOCTYPE, account)
}

let cachedAccountsIndex
function indexAccountsByType(cozy) {
  return cachedAccountsIndex
    ? Promise.resolve(cachedAccountsIndex)
    : cozy.data.defineIndex(ACCOUNTS_DOCTYPE, ['account_type']).then(index => {
        cachedAccountsIndex = index
        return Promise.resolve(index)
      })
}

function getLastSync(cozy, account) {
  return (
    cozy.data
      .defineIndex(KONNECTORS_RESULT_DOCTYPE, ['account'])
      .then(index =>
        cozy.data.query(index, {
          selector: { account: account._id }
        })
      )
      // FIXME: nosupport for multiple accounts right now
      .then(results => results[0] && results[0].last_success)
      .then(
        lastSync =>
          !lastSync || /^0001/.test(lastSync) ? null : new Date(lastSync)
      )
  )
}

export function getAccountsByType(cozy, accountType) {
  if (!accountType) throw new Error('Missing `accountType` parameter')

  return indexAccountsByType(cozy)
    .then(index =>
      cozy.data.query(index, {
        selector: {
          account_type: accountType
        }
      })
    )
    .then((accounts = []) =>
      Promise.all(
        accounts.map(account =>
          getLastSync(cozy, account).then(lastSync => {
            account.lastSync = lastSync
            return account
          })
        )
      )
    )
}

export function getAllAccounts(cozy) {
  return indexAccountsByType(cozy).then(index => {
    return cozy.data.query(index, {
      selector: {
        account_type: { $gt: null }
      }
    })
  })
}
