// constant
const FETCH_REGISTRY_KONNECTORS = 'FETCH_REGISTRY_KONNECTORS'
const FETCH_REGISTRY_KONNECTORS_ERROR = 'FETCH_REGISTRY_KONNECTORS_ERROR'
const FETCH_REGISTRY_KONNECTORS_SUCCESS = 'FETCH_REGISTRY_KONNECTORS_SUCCESS'

// reducers

const reducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_REGISTRY_KONNECTORS:
      return {
        data: state.data || [],
        fetchStatus: 'loading'
      }
    case FETCH_REGISTRY_KONNECTORS_SUCCESS:
      return {
        data: action.konnectors.reduce((konnectors, konnector) => {
          konnectors[konnector.slug] = konnector
          return konnectors
        }, {}),
        fetchStatus: 'loaded'
      }
    case FETCH_REGISTRY_KONNECTORS_ERROR:
      return {
        data: state.data,
        fetchStatus: 'error'
      }
    default:
      return state
  }
}

export default reducer
