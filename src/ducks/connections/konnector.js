import {
  CREATE_CONNECTION,
  ENQUEUE_CONNECTION,
  PURGE_QUEUE,
  UPDATE_CONNECTION_ERROR,
  UPDATE_CONNECTION_RUNNING_STATUS
} from './'

import account, { getConnectionStatus, isEnqueued } from './account'
import triggers from './triggers'

import { getKonnectorIcon } from '../../lib/icons'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CONNECTION:
    case ENQUEUE_CONNECTION:
    case UPDATE_CONNECTION_ERROR:
    case UPDATE_CONNECTION_RUNNING_STATUS:
    case 'LAUNCH_TRIGGER':
      return {
        ...state,
        triggers: triggers(state.triggers, action)
      }
    case PURGE_QUEUE:
      return Object.keys(state).reduce((accounts, accountId) => {
        return { ...accounts, [accountId]: account(state[accountId], action) }
      }, state)
    default:
      return state
  }
}

export default reducer

export const getQueuedConnections = (state, registryKonnector) => {
  return Object.keys(state).reduce((runningConnections, accountId) => {
    const label = registryKonnector.name
    const status = getConnectionStatus(state[accountId])
    const icon = getKonnectorIcon(registryKonnector)
    return isEnqueued(state[accountId])
      ? runningConnections.concat({ label, status, icon })
      : runningConnections
  }, [])
}
