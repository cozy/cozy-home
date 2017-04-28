/* accounts lib ready to be added to cozy-client-js */

const ACCOUNTS_DOCTYPE = 'io.cozy.accounts'

export function create (cozy, konnector, auth, name = '') {
  return cozy.data.create(ACCOUNTS_DOCTYPE, {
    name: name,
    account_type: konnector.vendorLink,
    status: 'PENDING',
    auth: {
      login: auth.login,
      password: auth.password
    }
  })
}
