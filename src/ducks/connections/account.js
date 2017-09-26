import {
  CREATE_CONNECTION,
  ENQUEUE_CONNECTION,
  PURGE_QUEUE,
  UPDATE_CONNECTION_ERROR,
  UPDATE_CONNECTION_RUNNING_STATUS
} from './'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CONNECTION:
      return state
    case ENQUEUE_CONNECTION:
      return { ...state, isQueued: true }
    case PURGE_QUEUE:
      return { ...state, isQueued: false }
    case UPDATE_CONNECTION_ERROR:
      const { error } = action
      if (error) return { ...state, error }
      return state
    case UPDATE_CONNECTION_RUNNING_STATUS:
      const { isRunning } = action
      const hasRun = state.hasRun || !!state.isRunning && !isRunning
      return { ...state, isRunning, hasRun }
    default:
      return state
  }
}

export default reducer

// selectors
export const hasError = (state) => {
  return !isRunning(state) && !!state.error
}

export const hasRun = (state) => {
  return !!state.hasRun
}

export const isQueued = (state) => {
  return !!state.isQueued
}

export const isRunning = (state) => {
  return !!state.isRunning
}
