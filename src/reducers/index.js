import { combineReducers } from 'redux'

import { reducer } from 'redux-cozy-client'
import registry from '../ducks/registry'
import connections, { getQueue } from '../ducks/connections'

export default () =>
  combineReducers({
    connections,
    cozy: reducer,
    registry
  })

// selectors
export const getConnectionsQueue = state => {
  return getQueue(state.connections, state.registry.konnectors)
}
