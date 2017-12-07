export const getAccountName = account => {
  if (account.auth) {
    return (
      account.auth.accountName ||
      account.auth.login ||
      account.auth.identifier ||
      account.auth.email ||
      account._id
    )
  } else {
    return account._id
  }
}
