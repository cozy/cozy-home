import {
  CREATE_CONNECTION,
  DELETE_CONNECTION,
  ENQUEUE_CONNECTION,
  PURGE_QUEUE,
  UPDATE_CONNECTION_ERROR,
  UPDATE_CONNECTION_RUNNING_STATUS
} from './'

import account, {
  getConnectionStatus,
  isQueued
} from './account'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CONNECTION:
    case ENQUEUE_CONNECTION:
    case UPDATE_CONNECTION_ERROR:
    case UPDATE_CONNECTION_RUNNING_STATUS:
      return { ...state, [action.account._id]: account(state[action.account._id], action) }
    case PURGE_QUEUE:
      return Object.keys(state).reduce((accounts, accountId) => {
        return { ...accounts, [accountId]: account(state[accountId], action) }
      }, state)
    case DELETE_CONNECTION:
      // mind = blown : https://stackoverflow.com/questions/36553129/what-is-the-shortest-way-to-modify-immutable-objects-using-spread-and-destructur
      return (({[action.account._id]: deleted, ...state}) => state)(state)
    default:
      return state
  }
}

export default reducer

// selectors
const getKonnectorIconURL = (registryKonnector) => {
  let icon = null
  try {
    icon = require(`../../assets/icons/konnectors/${registryKonnector.slug}.svg`)
  } catch (error) {
    console.warn(`Cannot get icon ${registryKonnector.slug}: ${error.message}`)
  }
  return icon
}

export const getQueuedConnections = (state, registryKonnector) => {
  return Object.keys(state).reduce((runningConnections, accountId) => {
    const label = registryKonnector.name
    const status = getConnectionStatus(state[accountId])
    const icon = getKonnectorIconURL(registryKonnector)
    return isQueued(state[accountId])
      ? runningConnections.concat({ label, status, icon })
        : runningConnections
  }, [])
}
