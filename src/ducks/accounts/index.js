export const DOCTYPE = 'io.cozy.accounts'

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
