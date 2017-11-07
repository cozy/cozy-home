import { fetchCollection, fetchDocument } from 'redux-cozy-client'

export const DOCTYPE = 'io.cozy.accounts'

export const fetchAccounts = () => fetchCollection('accounts', DOCTYPE)
export const fetchAccount = id => fetchDocument(DOCTYPE, id)
