/* accounts lib ready to be added to cozy-client-js */
export const ACCOUNTS_DOCTYPE = 'io.cozy.accounts'

export const ACCOUNT_ERRORS = {
  LOGIN_FAILED: 'LOGIN_FAILED',
  MAINTENANCE: 'MAINTENANCE',
  NOT_EXISTING_DIRECTORY: 'NOT_EXISTING_DIRECTORY',
  SUCCESS_TIMEOUT: 'SUCCESS_TIMEOUT',
  USER_ACTION_NEEDED: 'USER_ACTION_NEEDED'
}

export function update(cozy, account, newAccount) {
  // Fetch the current account to get the correct _rev attribute.
  // It may have changed, if a job has been running for example.
  return cozy.data.find(ACCOUNTS_DOCTYPE, account._id).then(currentAccount => {
    return cozy.data.updateAttributes(ACCOUNTS_DOCTYPE, account.id, {
      auth: newAccount.auth
    })
  })
}

export function _delete(cozy, account) {
  return cozy.data.delete(ACCOUNTS_DOCTYPE, account)
}
