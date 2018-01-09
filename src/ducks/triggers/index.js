import * as fromCozyClient from 'redux-cozy-client'
import { getAccount } from '../accounts'
import * as fromRunning from './running'

export const DOCTYPE = 'io.cozy.triggers'
const triggersCollectionKey = 'triggers'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'LAUNCH_TRIGGER':
    case 'RECEIVE_NEW_DOCUMENT':
      return {
        ...state,
        running: fromRunning.reducer(state.running, action)
      }
    default:
      return state
  }
}

export default reducer

// CRUD action creators

export const fetchTriggers = () =>
  fromCozyClient.fetchTriggers(triggersCollectionKey, 'konnector')

export const createKonnectorTrigger = (
  konnector,
  account,
  folder,
  options = {}
) =>
  fromCozyClient.createTrigger(
    buildKonnectorTrigger(konnector, account, folder, options),
    {
      updateCollections: [triggersCollectionKey]
    }
  )

export const deleteTrigger = trigger =>
  fromCozyClient.deleteTrigger(trigger, {
    updateCollections: [triggersCollectionKey]
  })

export const launchTrigger = trigger => fromCozyClient.launchTrigger(trigger)

// Helpers

export function buildKonnectorTrigger(
  konnector,
  account,
  folder,
  options = {}
) {
  const { day, hours, minutes } = options

  let workerArguments = {
    konnector: konnector.slug || konnector.attributes.slug,
    account: account._id
  }

  if (folder) {
    workerArguments['folder_to_save'] = folder._id
  }

  return {
    _type: DOCTYPE,
    attributes: {
      type: '@cron',
      arguments: `0 ${minutes || 0} ${hours || 0} * * ${day || '*'}`,
      worker: 'konnector',
      worker_arguments: workerArguments
    }
  }
}

// selectors

export const getKonnectorConnectedAccount = (
  state,
  konnector,
  existingAccounts = []
) => {
  // state is state.cozy
  const trigger = getTriggerByKonnector(state, konnector, existingAccounts)

  if (!trigger) return null

  return getAccount(state, trigger.message.account)
}

export const getTrigger = (state, id) =>
  !!state.documents &&
  !!state.documents[DOCTYPE] &&
  state.documents[DOCTYPE][id]

export const getTriggerByKonnector = (
  state,
  konnector,
  existingAccountIds = []
) => {
  // state is state.cozy
  if (!konnector || !state.documents || !state.documents[DOCTYPE]) return null
  const trigger = Object.values(state.documents[DOCTYPE]).find(trigger => {
    return (
      trigger.worker === 'konnector' &&
      trigger.message &&
      trigger.message.konnector === konnector.slug &&
      trigger.message.account &&
      existingAccountIds.includes(trigger.message.account)
    )
  })
  return trigger
}

export const isTriggerRunning = (state, trigger) => {
  return fromRunning.isTriggerRunning(state.running, trigger)
}

export const getKonnectorsByStatus = (connections, status) =>
  Object.values(connections).filter(
    connection => connection.trigger.current_state.status === status
  )
