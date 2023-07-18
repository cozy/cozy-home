import { combineReducers } from 'redux'
import get from 'lodash/get'

import { reducer } from 'lib/redux-cozy-client'
import * as fromAccounts from 'ducks/accounts'
import * as fromKonnectors from 'ducks/konnectors'
import * as fromTriggers from 'ducks/triggers'
import connections, * as fromConnections from 'ducks/connections'

export default cozyClient =>
  combineReducers({
    connections,
    oldcozy: reducer,
    cozy: cozyClient.reducer()
  })

// selectors
export const getInstalledKonnectors = state =>
  fromKonnectors.getInstalledKonnectors(state.oldcozy)

export const getConnectionsByKonnector = (state, konnectorSlug) =>
  fromConnections.getConnectionsByKonnector(
    state.connections,
    konnectorSlug,
    fromAccounts.getIds(state.oldcozy),
    fromKonnectors.getSlugs(state.oldcozy)
  )

export const getCreatedConnectionAccount = state =>
  fromAccounts.getAccount(
    state.oldcozy,
    fromConnections.getCreatedAccount(state.connections)
  )

export const getTriggerByKonnectorAndAccount = (state, konnector, account) => {
  const triggerId = fromConnections.getTriggerIdByKonnectorAndAccount(
    state.connections,
    konnector,
    account,
    fromAccounts.getIds(state.oldcozy)
  )
  return fromTriggers.getTrigger(state.oldcozy, triggerId)
}

export const getTriggersByKonnector = (state, konnectorSlug) => {
  const triggersInState = state.oldcozy.documents['io.cozy.triggers'] || {}
  const triggers = Object.keys(triggersInState).reduce((acc, key) => {
    const document = state.oldcozy.documents['io.cozy.triggers'][key]
    if (
      fromConnections.isKonnectorTrigger(document) &&
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
