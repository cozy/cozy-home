import konnectors from './konnectors'

// constant
const FETCH_REGISTRY_KONNECTORS = 'FETCH_REGISTRY_KONNECTORS'
const FETCH_REGISTRY_KONNECTORS_SUCCESS = 'FETCH_REGISTRY_KONNECTORS_SUCCESS'

export const OTHERS_CATEGORY = 'others'

// reducers
const reducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_REGISTRY_KONNECTORS:
    case FETCH_REGISTRY_KONNECTORS_SUCCESS:
      return {
        konnectors: konnectors(state.konnectors, action)
      }
    default:
      return state
  }
}

export default reducer
