import { combineReducers } from 'redux'

import { reducer } from 'redux-cozy-client'
import registry from '../ducks/registry'

export default () => combineReducers({
  cozy: reducer,
  registry
})
