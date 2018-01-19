/* global cozy */

import konnectors from './konnectors'

// constant
const FETCH_REGISTRY_KONNECTORS = 'FETCH_REGISTRY_KONNECTORS'
const FETCH_REGISTRY_KONNECTORS_ERROR = 'FETCH_REGISTRY_KONNECTORS_ERROR'
const FETCH_REGISTRY_KONNECTORS_SUCCESS = 'FETCH_REGISTRY_KONNECTORS_SUCCESS'

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
export const getRegistryKonnectors = state =>
  Object.values(state.konnectors.data) || []

export const getRegistryKonnectorsByCategory = (state, category) =>
  category
    ? Object.values(state.konnectors.data).filter(konnector =>
        konnector.categories.includes(category)
      )
    : getRegistryKonnectors(state)

export const getRegistryKonnectorsByDataType = (state, dataType) =>
  dataType
    ? Object.values(state.konnectors.data).filter(
        konnector =>
          Array.isArray(konnector.dataType) &&
          konnector.dataType.includes(dataType)
      )
    : []

export const getRegistryKonnectorsFromSlugs = (state, slugs = []) => {
  return slugs.reduce((returnedKonnectors, slug) => {
    if (
      state.konnectors &&
      state.konnectors.data &&
      state.konnectors.data[slug]
    ) {
      return returnedKonnectors.concat([state.konnectors.data[slug]])
    }
    return returnedKonnectors
  }, [])
}

export const getRegistryKonnector = (state, slug) => {
  return state.konnectors.data[slug]
}

export const getSlugs = state => {
  return Object.keys(state.konnectors.data)
}

export const isFetchingRegistryKonnector = state => {
  return state.konnectors.fetchStatus === 'loading'
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
        if (konnectorsToExclude && konnectorsToExclude.length) {
          return dispatch({
            type: FETCH_REGISTRY_KONNECTORS_SUCCESS,
            konnectors: konnectors.filter(
              k => !konnectorsToExclude.includes(k.slug)
            )
          })
        }
        return dispatch({ type: FETCH_REGISTRY_KONNECTORS_SUCCESS, konnectors })
      })
      .catch(() => {
        dispatch({ type: FETCH_REGISTRY_KONNECTORS_ERROR, konnectors: [] })
      })
  }
}
