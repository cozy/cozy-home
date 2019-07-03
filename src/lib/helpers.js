import { probableLoginFieldNames } from './accounts'

export const getAccountName = account => {
  if (!account) return null
  if (account.auth) {
    return account.auth.accountName || getAccountLogin(account) || account._id
  } else {
    return account._id
  }
}

export const getAccountLogin = account => {
  if (account && account.auth) {
    for (const fieldName of probableLoginFieldNames) {
      if (account.auth[fieldName]) return account.auth[fieldName]
    }
  }
}
