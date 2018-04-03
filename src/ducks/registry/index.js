/* global cozy */

import konnectors from './konnectors'

// constant
const FETCH_REGISTRY_KONNECTORS = 'FETCH_REGISTRY_KONNECTORS'
const FETCH_REGISTRY_KONNECTORS_ERROR = 'FETCH_REGISTRY_KONNECTORS_ERROR'
const FETCH_REGISTRY_KONNECTORS_SUCCESS = 'FETCH_REGISTRY_KONNECTORS_SUCCESS'

export const OTHERS_CATEGORY = 'others'

// helpers
const sanitizeKonnector = konnector => ({
  categories: [],
  ...konnector
})

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

// selectors
export const getRegistryKonnector = (state, slug) => {
  return state.konnectors.data[slug]
}

export const getSlugs = state => {
  return Object.keys(state.konnectors.data)
}

// action creators sync

export const initializeRegistry = konnectors => {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_REGISTRY_KONNECTORS })
    return cozy.client
      .fetchJSON('GET', '/settings/context')
      .catch(error => {
        console.warn &&
          console.warn(`Cannot get Cozy context : ${error.message}`)
        return {}
      })
      .then(context => {
        const konnectorsToExclude =
          !!context.attributes && context.attributes.exclude_konnectors
        const filteredKonnectors =
          context.attributes && context.attributes.debug
            ? konnectors
            : konnectors.filter(k => !k.testing)

        if (konnectorsToExclude && konnectorsToExclude.length) {
          return dispatch({
            type: FETCH_REGISTRY_KONNECTORS_SUCCESS,
            konnectors: filteredKonnectors.filter(
              k => !konnectorsToExclude.includes(k.slug)
            )
          })
        }
        return dispatch({
          type: FETCH_REGISTRY_KONNECTORS_SUCCESS,
          konnectors: filteredKonnectors.map(sanitizeKonnector)
        })
      })
      .catch(() => {
        dispatch({ type: FETCH_REGISTRY_KONNECTORS_ERROR, konnectors: [] })
      })
  }
}
