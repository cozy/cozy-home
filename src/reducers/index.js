import { combineReducers } from 'redux'
import get from 'lodash/get'

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

export const getTriggersByKonnector = (state, konnectorSlug) => {
  const triggers = Object.keys(state.cozy.documents['io.cozy.triggers']).reduce(
    (acc, key) => {
      const document = state.cozy.documents['io.cozy.triggers'][key]
      if (
        document.worker === 'konnector' &&
        get(document, 'message.konnector') === konnectorSlug
      ) {
        acc.push(document)
      }
      return acc
    },
    []
  )
  return triggers
}
