import {
  CREATE_CONNECTION,
  UPDATE_CONNECTION_ERROR,
  UPDATE_CONNECTION_RUNNING_STATUS
} from './'

import account, { isRunning, hasRun } from './account'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CONNECTION:
    case UPDATE_CONNECTION_ERROR:
    case UPDATE_CONNECTION_RUNNING_STATUS:
      return { ...state, [action.account._id]: account(state[action.account._id], action) }
    default:
      return state
  }
}

export default reducer

// selectors
export const hasRunningConnection = (state) => {
  return Object.keys(state).find(key => isRunning(state[key]))
}

export const hasRunConnection = (state) => {
  return Object.keys(state).find(key => hasRun(state[key]))
}
