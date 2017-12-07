import { combineReducers } from 'redux'

import { reducer } from 'redux-cozy-client'
import * as fromAccounts from '../ducks/accounts'
import * as fromTriggers from '../ducks/triggers'
import registry from '../ducks/registry'
import connections, * as fromConnections from '../ducks/connections'

export default () =>
  combineReducers({
    connections,
    cozy: reducer,
    registry
  })

// selectors
export const getConfiguredKonnectors = state =>
  fromConnections.getConfiguredKonnectors(
    state.connections,
    fromAccounts.getIds(state.cozy)
  )

export const getConnectionStatus = (state, konnector) =>
  fromConnections.getConnectionStatus(
    state.connections,
    konnector,
    fromAccounts.getIds(state.cozy)
  )

export const getConnectionsQueue = state =>
  fromConnections.getQueue(state.connections, state.registry.konnectors)

export const getKonnectorConnectedAccount = (state, konnector) =>
  fromTriggers.getKonnectorConnectedAccount(
    state.cozy,
    konnector,
    fromAccounts.getIds(state.cozy)
  )

export const getTriggerByKonnector = (state, konnector) =>
  fromTriggers.getTriggerByKonnector(
    state.cozy,
    konnector,
    fromAccounts.getIds(state.cozy)
  )

export const isConnectionDeleting = state =>
  fromConnections.isConnectionDeleting(state.connections)
