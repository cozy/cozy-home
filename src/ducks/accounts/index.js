import {
  createDocument,
  fetchCollection,
  fetchDocument
} from 'redux-cozy-client'

export const DOCTYPE = 'io.cozy.accounts'
const accountCollectionKey = 'accounts'

export const createAccount = (auth, name) =>
  createDocument(DOCTYPE, buildAccount(auth, name), {
    updateCollections: [accountCollectionKey]
  })

export const fetchAccounts = () =>
  fetchCollection(accountCollectionKey, DOCTYPE)

export const fetchAccount = id => fetchDocument(DOCTYPE, id)

// Factory helpers

export const buildAccount = (auth, name) => {
  const doc = { type: DOCTYPE, auth }

  if (name) {
    doc.name = name
  }

  return doc
}

// selectors
export const getAccount = (state, id) => {
  if (!state.documents || !state.documents[DOCTYPE]) {
    return null
  }

  return state.documents[DOCTYPE][id]
}
