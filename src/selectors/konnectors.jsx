import { createSelector } from 'reselect'

export const getInstalledKonnectors = createSelector(
  state => state.cozy.documents['io.cozy.konnectors'],
  konnectors => konnectors
)
