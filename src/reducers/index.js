import { combineReducers } from 'redux'

import { reducer } from 'redux-cozy-client'
import registry from '../ducks/registry'
import connections, {
  getQueue as getConnectionsQueue,
  getRun,
  getSuccessfulRun as getSuccessfulConnectionsRun
} from '../ducks/connections'

export default () => combineReducers({
  connections,
  cozy: reducer,
  registry
})

// selectors
export const getQueue = (state) => {
  return getConnectionsQueue(state.connections, state.registry.konnectors)
}

export const getRunConnections = (state) => {
  return getRun(state.connections)
}

export const getSuccessfulRun = (state) => {
  return getSuccessfulConnectionsRun(state.connections)
}
