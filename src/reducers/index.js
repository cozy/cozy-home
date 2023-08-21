import { combineReducers } from 'redux'
import get from 'lodash/get'

const isKonnectorTrigger = doc =>
  doc._type === 'io.cozy.triggers' && !!doc.message && !!doc.message.konnector
export default cozyClient =>
  combineReducers({
    cozy: cozyClient.reducer()
  })

// selectors

export const getTriggersByKonnector = (state, konnectorSlug) => {
  const triggersInState = state.cozy.documents['io.cozy.triggers'] || {}
  const triggers = Object.keys(triggersInState).reduce((acc, key) => {
    const document = state.cozy.documents['io.cozy.triggers'][key]
    if (
      isKonnectorTrigger(document) &&
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
