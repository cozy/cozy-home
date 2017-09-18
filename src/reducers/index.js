import { combineReducers } from 'redux'

import { reducer } from 'redux-cozy-client'
import registry from '../ducks/registry'
import connections, {
  getQueue as getConnectionsQueue
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
