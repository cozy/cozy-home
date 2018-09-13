import {
  createDocument,
  fetchCollection,
  fetchDocument
} from 'redux-cozy-client'

export const DOCTYPE = 'io.cozy.accounts'
const accountCollectionKey = 'accounts'

export const createAccount = attributes =>
  createDocument(
    DOCTYPE,
    { type: DOCTYPE, ...attributes },
    {
      updateCollections: [accountCollectionKey]
    }
  )

export const fetchAccounts = () =>
  fetchCollection(accountCollectionKey, DOCTYPE)

export const fetchAccount = id => {
  return fetchDocument(DOCTYPE, id, {
    collection: [accountCollectionKey]
  })
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
