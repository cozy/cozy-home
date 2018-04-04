import { fetchCollection } from 'redux-cozy-client'

export const DOCTYPE = 'io.cozy.konnectors'

// CRUD

export const fetchKonnectors = () => fetchCollection('konnectors', DOCTYPE)

// TODO: Fetch the registry
export const fetchKonnectorsInMaintenance = () =>
  require('../../config/maintenance')

// Selectors

export const getKonnector = (state, slug) =>
  !!state.documents &&
  !!state.documents[DOCTYPE] &&
  state.documents[DOCTYPE][`${DOCTYPE}/${slug}`]

export const getKonnectorsByCategory = (state, category) =>
  !!state.documents &&
  !!state.documents[DOCTYPE] &&
  Object.keys(state.documents[DOCTYPE]).reduce((konnectors, slug) => {
    return state.documents[DOCTYPE][slug].category === category
      ? konnectors.concat([state.documents[DOCTYPE][slug]])
      : konnectors
  }, [])

export const getIndexedKonnectors = state =>
  !!state.documents &&
  !!state.documents[DOCTYPE] &&
  Object.keys(state.documents[DOCTYPE]).reduce((indexed, key) => {
    const konnector = state.documents[DOCTYPE][key]
    indexed[konnector.slug] = konnector
    return indexed
  }, {})

export const getSlugs = state =>
  !!state &&
  !!state.documents &&
  !!state.documents[DOCTYPE] &&
  Object.values(state.documents[DOCTYPE]).map(konnector => konnector.slug)
