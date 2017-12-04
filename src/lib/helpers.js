export const getAccountName = account => {
  if (account.accountName) return account.accountName
  if (account.auth) {
    return account.auth.login || account.auth.identifier || account.auth.email
  } else {
    return account._id
  }
}
