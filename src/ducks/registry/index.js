// constant
const INITIALIZE_REGISTRY_KONNECTORS = 'INITIALIZE_REGISTRY_KONNECTORS'

// reducers

const initialState = { konnectors: [] }
const registry = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_REGISTRY_KONNECTORS:
      return {konnectors: action.konnectors}
    default:
      return state
  }
}

export default registry

// selectors

export const getRegistryKonnectors = state => state.registry.konnectors
export const getRegistryKonnector = (state, slug) => state.registry.konnectors.find(konnector => konnector.slug === slug)

// action creators sync

export const initializeRegistry = konnectors => ({type: INITIALIZE_REGISTRY_KONNECTORS, konnectors: konnectors})
