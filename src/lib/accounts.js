/* accounts lib ready to be added to cozy-client-js */
import * as realtime from './realtime'

export const ACCOUNTS_DOCTYPE = 'io.cozy.accounts'

export const ACCOUNT_ERRORS = {
  LOGIN_FAILED: 'LOGIN_FAILED',
  MAINTENANCE: 'MAINTENANCE',
  NOT_EXISTING_DIRECTORY: 'NOT_EXISTING_DIRECTORY',
  SUCCESS_TIMEOUT: 'SUCCESS_TIMEOUT',
  USER_ACTION_NEEDED: 'USER_ACTION_NEEDED'
}

// Order matters
export const probableLoginFieldNames = [
  'login',
  'identifier',
  'new_identifier',
  'email'
]

function ignorePassword(auth) {
  const sanitized = { ...auth }
  delete sanitized.password
  return sanitized
}

function sanitizeAccountAuthForUpdate(auth) {
  const sanitized = { ...auth }
  delete sanitized.credentials_encrypted
  // Always ignore empty passwords on account update
  const { password } = auth
  if (typeof password !== 'undefined' && !password) {
    return ignorePassword(sanitized)
  }
  return sanitized
}

export function update(cozy, account, newAccount) {
  return cozy.data.updateAttributes(ACCOUNTS_DOCTYPE, account._id, {
    auth: {
      ...ignorePassword(account.auth),
      ...sanitizeAccountAuthForUpdate(newAccount.auth)
    }
  })
}

export function _delete(cozy, account) {
  return cozy.data.delete(ACCOUNTS_DOCTYPE, account)
}

export function subscribeAll(cozy) {
  return realtime.subscribeAll(cozy, ACCOUNTS_DOCTYPE)
}
