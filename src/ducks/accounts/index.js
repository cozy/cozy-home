import {
  createDocument,
  deleteDocument,
  fetchCollection,
  fetchDocument
} from 'redux-cozy-client'

export const DOCTYPE = 'io.cozy.accounts'
const accountCollectionKey = 'accounts'

export const createAccount = (auth, name) =>
  createDocument(DOCTYPE, buildAccount(auth, name), {
    updateCollections: [accountCollectionKey]
  })

export const deleteAccount = deleteDocument

export const fetchAccounts = () =>
  fetchCollection(accountCollectionKey, DOCTYPE)

export const fetchAccount = id => {
  return fetchDocument(DOCTYPE, id, {
    collection: [accountCollectionKey]
  })
}

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

export const getIds = state =>
  // state.collection is bugged, it does not update correctly id list on
  // RECEIVE_DATA
  // (state.collections &&
  //   state.collections[accountCollectionKey] &&
  //   state.collections[accountCollectionKey].ids) ||
  // []
  (state.documents &&
    state.documents[DOCTYPE] &&
    Object.keys(state.documents[DOCTYPE])) ||
  []
