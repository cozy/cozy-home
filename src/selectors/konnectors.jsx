import { createSelector } from 'reselect'

export const getInstalledKonnectors = createSelector(
  state => state.cozy.documents['io.cozy.konnectors'],
  konnectors => konnectors
)

export const getKonnectorBySlug = createSelector(
  state => state.cozy.documents['io.cozy.konnectors'],
  (_, slug) => slug,
  (konnectors, slug) => konnectors.filter(konnector => konnector.slug === slug)
)
