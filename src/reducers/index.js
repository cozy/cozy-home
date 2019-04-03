import { combineReducers } from 'redux'

import { reducer } from 'redux-cozy-client'
import apps from 'ducks/apps'
import * as fromAccounts from 'ducks/accounts'
import * as fromKonnectors from 'ducks/konnectors'
import * as fromTriggers from 'ducks/triggers'
import connections, * as fromConnections from 'ducks/connections'

export default () =>
  combineReducers({
    apps,
    connections,
    cozy: reducer
  })

// selectors
export const getInstalledKonnectors = state =>
  fromKonnectors.getInstalledKonnectors(state.cozy)

export const getConnectionsByKonnector = (state, konnectorSlug) =>
  fromConnections.getConnectionsByKonnector(
    state.connections,
    konnectorSlug,
    fromAccounts.getIds(state.cozy),
    fromKonnectors.getSlugs(state.cozy)
  )

export const getConnectionsQueue = state =>
  fromConnections.getQueue(
    state.connections,
    fromKonnectors.getIndexedKonnectors(state.cozy)
  )

export const getCreatedConnectionAccount = state =>
  fromAccounts.getAccount(
    state.cozy,
    fromConnections.getCreatedAccount(state.connections)
  )

export const getKonnectorTriggersCount = (state, konnector) =>
  fromTriggers.getKonnectorTriggers(
    state.cozy,
    konnector,
    fromAccounts.getIds(state.cozy)
  ).length

export const getKonnectorsInMaintenance = () =>
  fromKonnectors.fetchKonnectorsInMaintenance()

export const getTriggerByKonnectorAndAccount = (state, konnector, account) => {
  const triggerId = fromConnections.getTriggerIdByKonnectorAndAccount(
    state.connections,
    konnector,
    account,
    fromAccounts.getIds(state.cozy)
  )
  return fromTriggers.getTrigger(state.cozy, triggerId)
}

export const isConnectionDeleting = state =>
  fromConnections.isConnectionDeleting(state.connections)
