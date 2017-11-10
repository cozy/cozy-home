import {
  CREATE_CONNECTION,
  DELETE_CONNECTION,
  ENQUEUE_CONNECTION,
  PURGE_QUEUE,
  UPDATE_CONNECTION_ERROR,
  UPDATE_CONNECTION_RUNNING_STATUS
} from './'

import account, { getConnectionStatus, isQueued } from './account'

import { getKonnectorIcon } from '../../lib/icons'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CONNECTION:
    case ENQUEUE_CONNECTION:
    case UPDATE_CONNECTION_ERROR:
    case UPDATE_CONNECTION_RUNNING_STATUS:
      return {
        ...state,
        [action.account._id]: account(state[action.account._id], action)
      }
    case PURGE_QUEUE:
      return Object.keys(state).reduce((accounts, accountId) => {
        return { ...accounts, [accountId]: account(state[accountId], action) }
      }, state)
    case DELETE_CONNECTION:
      // mind = blown : https://stackoverflow.com/questions/36553129/what-is-the-shortest-way-to-modify-immutable-objects-using-spread-and-destructur
      return (({ [action.account._id]: deleted, ...state }) => state)(state)
    default:
      return state
  }
}

export default reducer

export const getKonnectorAccount = state => {
  // state is an object containing a set of id: account
  // At this time, it contains only one account.
  if (!state) return null
  return state[Object.keys(state)[0]]
}

export const getQueuedConnections = (state, registryKonnector) => {
  return Object.keys(state).reduce((runningConnections, accountId) => {
    const label = registryKonnector.name
    const status = getConnectionStatus(state[accountId])
    const icon = getKonnectorIcon(registryKonnector)
    return isQueued(state[accountId])
      ? runningConnections.concat({ label, status, icon })
      : runningConnections
  }, [])
}
