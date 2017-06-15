/* accounts lib ready to be added to cozy-client-js */

const ACCOUNTS_DOCTYPE = 'io.cozy.accounts'

export const ACCOUNT_ERRORS = {
  LOGIN_FAILED: 'LOGIN_FAILED',
  SUCCESS_TIMEOUT: 'SUCCESS_TIMEOUT'
}

export function create (cozy, konnector, auth, folder, name = '') {
  return cozy.data.create(ACCOUNTS_DOCTYPE, {
    name: name,
    account_type: konnector.slug,
    status: 'PENDING',
    auth: auth,
    folderId: folder._id
  })
}

export function update (cozy, account, newAccount) {
  return cozy.data.update(ACCOUNTS_DOCTYPE, account, newAccount)
}

export function _delete (cozy, account) {
  return cozy.data.delete(ACCOUNTS_DOCTYPE, account)
}

let cachedAccountsIndex
function indexAccountsByType (cozy) {
  return cachedAccountsIndex
    ? Promise.resolve(cachedAccountsIndex)
    : cozy.data.defineIndex(ACCOUNTS_DOCTYPE, ['account_type', 'name'])
      .then(index => {
        cachedAccountsIndex = index
        return Promise.resolve(index)
      })
}

export function getAccountsByType (cozy, accountType) {
  if (!accountType) throw new Error('Missing `accountType` parameter')
  return indexAccountsByType(cozy)
  .then(index => {
    return cozy.data.query(index, {
      selector: {'account_type': accountType}
    })
  })
}

export function getAllAccounts (cozy) {
  return indexAccountsByType(cozy)
  .then(index => {
    return cozy.data.query(index, {
      selector: {'account_type': {'$gt': null}}
    })
  })
}
