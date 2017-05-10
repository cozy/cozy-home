/* accounts lib ready to be added to cozy-client-js */

const ACCOUNTS_DOCTYPE = 'io.cozy.accounts'

export function create (cozy, konnector, auth, folder, name = '') {
  return cozy.data.create(ACCOUNTS_DOCTYPE, {
    name: name,
    account_type: konnector.slug,
    status: 'PENDING',
    auth: {
      login: auth.login,
      password: auth.password
    },
    folderId: folder._id
  })
}

export function _delete (cozy, account) {
  return cozy.data.delete(ACCOUNTS_DOCTYPE, account)
}

function indexAccountsByType (cozy) {
  return cozy.data.defineIndex(ACCOUNTS_DOCTYPE, ['account_type', 'name'])
}

export function getAccountsByType (cozy, accountType, accountsIndex) {
  if (!accountType) throw new Error('Missing `accountType` parameter')
  if (accountsIndex) {
    return cozy.data.query(accountsIndex, {
      selector: {'account_type': accountType}
    })
  } else {
    return indexAccountsByType(cozy)
    .then(index => {
      return cozy.data.query(index, {
        selector: {'account_type': accountType}
      })
    })
  }
}
