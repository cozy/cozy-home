import keyBy from 'lodash/keyBy'
import { fetchKonnectors as cozyClientFetchKonnectors } from 'lib/redux-cozy-client'

export const DOCTYPE = 'io.cozy.konnectors'
const konnectorsCollectionKey = 'konnectors'

export const fetchKonnectors = () =>
  cozyClientFetchKonnectors(konnectorsCollectionKey)

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

const getKonnectorsFromState = state => {
  return !!state && !!state.documents && state.documents[DOCTYPE]
}

// Selectors
export const getKonnector = (state, slug) => {
  const konnectors = getKonnectorsFromState(state)
  return konnectors && konnectors[`${DOCTYPE}/${slug}`]
}

export const getInstalledKonnectors = state => {
  const konnectors = getKonnectorsFromState(state)
  return konnectors ? Object.values(konnectors) : []
}

export const getIndexedKonnectors = state => {
  const konnectors = getKonnectorsFromState(state)
  return konnectors ? keyBy(Object.values(konnectors), konn => konn.slug) : {}
}

export const getSlugs = state => {
  const konnectors = getKonnectorsFromState(state)
  return konnectors
    ? Object.values(konnectors).map(konnector => konnector.slug)
    : []
}
