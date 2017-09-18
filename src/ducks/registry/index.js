import konnectors from './konnectors'

// constant
const INITIALIZE_REGISTRY_KONNECTORS = 'INITIALIZE_REGISTRY_KONNECTORS'

// reducers

const reducer = (state = {}, action) => {
  switch (action.type) {
    case INITIALIZE_REGISTRY_KONNECTORS:
      return {
        konnectors: konnectors(state.konnectors, action)
      }
    default:
      return state
  }
}

export default reducer

// selectors

export const getRegistryKonnectors = state => state.registry.konnectors
export const getRegistryKonnector = (state, slug) => state.registry.konnectors.find(konnector => konnector.slug === slug)

// action creators sync

export const initializeRegistry = konnectors => ({type: INITIALIZE_REGISTRY_KONNECTORS, konnectors: konnectors})
