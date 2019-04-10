import uuid from 'uuid/v4'

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

export const getCompleteFolderPath = (defaultDir, konnectorName, t) => {
  let folderPath = `/${defaultDir}/$konnector/${uuid()}`
  return folderPath
    .replace(/\/\//g, '/')
    .replace(/\$konnector/gi, konnectorName)
    .replace(
      /\$administrative/gi,
      t('account.folder.placeholder.administrative')
    )
    .replace(/\$photos/gi, t('account.folder.placeholder.photos'))
}
