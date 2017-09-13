import { combineReducers } from 'redux'

import { reducer } from 'redux-cozy-client'
import connections from '../ducks/connections'
import registry from '../ducks/registry'

export default () => combineReducers({
  connections,
  cozy: reducer,
  registry
})
