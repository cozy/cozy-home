import { combineReducers } from 'redux'
import get from 'lodash/get'

import apps from 'ducks/apps'
import * as fromAccounts from 'ducks/accounts'
import * as fromKonnectors from 'ducks/konnectors'
import * as fromTriggers from 'ducks/triggers'
import connections, * as fromConnections from 'ducks/connections'

export default cozyClient =>
  combineReducers({
    apps,
    connections,
    cozy: cozyClient.reducer()
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
  const triggersInState = state.cozy.documents['io.cozy.triggers'] || {}
  const triggers = Object.keys(triggersInState).reduce((acc, key) => {
    const document = state.cozy.documents['io.cozy.triggers'][key]
    if (
      document.worker === 'konnector' &&
      get(document, 'message.konnector') === konnectorSlug
    ) {
      acc.push(document)
    }
    return acc
  }, [])
  return triggers
}

export const getTriggersInError = state => {
  const triggers = get(state, ['cozy', 'documents', 'io.cozy.triggers'], {})

  return Object.values(triggers).filter(trigger => {
    const isInError = get(trigger, 'current_state.status') === 'errored'

    return isInError
  })
}

export const getAccountsWithErrors = state => {
  const accountsWithErrorsIds = getTriggersInError(state).map(trigger =>
    get(trigger, 'message.account')
  )
  const accounts = get(state, ['cozy', 'documents', 'io.cozy.accounts'], {})

  return Object.values(accounts).filter(({ _id }) =>
    accountsWithErrorsIds.includes(_id)
  )
}
