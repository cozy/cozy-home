import { fetchCollection } from 'redux-cozy-client'

export const DOCTYPE = 'io.cozy.konnectors'

// CRUD

export const fetchKonnectors = () => fetchCollection('konnectors', DOCTYPE)
// export const fetchKonnectorBySlug = slug =>
//   fetchCollection('konnector', DOCTYPE, {
//     selector: {
//       slug: slug
//     }
//   })
//
// export const fetchRegistryKonnectorBySlug = slug => {
//   // Temporary solution as we do not actually fetch konnector registry
//   return Promise.resolve({
//     /* global initKonnectors */
//     data: [initKonnectors.find(konnector => konnector.slug === slug)]
//   })
// }
