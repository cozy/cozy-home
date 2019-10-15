import * as fromCozyClient from 'redux-cozy-client'

export const DOCTYPE = 'io.cozy.konnectors'
const konnectorsCollectionKey = 'konnectors'

// CRUD

export const fetchKonnectors = () =>
  fromCozyClient.fetchKonnectors(konnectorsCollectionKey)

// Action creators
export const receiveInstalledKonnector = konnector => {
  const normalized = {
    ...konnector,
    ...konnector.attributes,
    id: `${DOCTYPE}/${konnector.slug}`,
    _type: DOCTYPE
  }

  return {
    doctype: DOCTYPE,
    type: 'RECEIVE_NEW_DOCUMENT',
    response: { data: [normalized] },
    updateCollections: ['konnectors']
  }
}

// Selectors
export const getKonnector = (state, slug) => {
  return (
    !!state.documents &&
    !!state.documents[DOCTYPE] &&
    state.documents[DOCTYPE][`${DOCTYPE}/${slug}`]
  )
}

export const getInstalledKonnectors = state =>
  !!state.documents &&
  !!state.documents[DOCTYPE] &&
  Object.values(state.documents[DOCTYPE])

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
