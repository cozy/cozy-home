// constant
const INITIALIZE_REGISTRY_KONNECTORS = 'INITIALIZE_REGISTRY_KONNECTORS'

// reducers

const reducer = (state = {}, action) => {
  switch (action.type) {
    case INITIALIZE_REGISTRY_KONNECTORS:
      return action.konnectors.reduce((konnectors, konnector) => {
        konnectors[konnector.slug] = konnector
        return konnectors
      }, {})
    default:
      return state
  }
}

export default reducer
