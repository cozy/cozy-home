import {
  fetchCollection
} from 'redux-cozy-client'

export const DOCTYPE = 'io.cozy.konnectors'

export const fetchKonnectors = () => fetchCollection('konnectors', DOCTYPE)
