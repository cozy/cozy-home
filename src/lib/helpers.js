/* global cozy */

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
    return account.auth.login || account.auth.identifier || account.auth.email
  }
}

export const redirectToStore = () => {
  cozy.client.intents.redirect('io.cozy.konnectors', { type: 'konnector' })
}
