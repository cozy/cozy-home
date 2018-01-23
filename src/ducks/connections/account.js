import {
  CREATE_CONNECTION,
  ENQUEUE_CONNECTION,
  PURGE_QUEUE,
  UPDATE_CONNECTION_ERROR,
  UPDATE_CONNECTION_RUNNING_STATUS
} from './'

const DOCTYPE = 'io.cozy.accounts'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CONNECTION:
      return state
    case ENQUEUE_CONNECTION:
      return { ...state, isEnqueued: true }
    case PURGE_QUEUE:
      return { ...state, isEnqueued: false }
    case UPDATE_CONNECTION_ERROR:
      const { error } = action
      if (error) return { ...state, error }
      return state
    case UPDATE_CONNECTION_RUNNING_STATUS:
      const { isRunning } = action
      const hasRun = state.hasRun || (!!state.isRunning && !isRunning)
      return {
        ...state,
        isRunning,
        hasRun,
        error: isRunning ? null : state.error || null
      }
    default:
      return state
  }
}

export default reducer

// selectors
export const getAccount = (state, accountId) =>
  state.documents &&
  state.documents[DOCTYPE] &&
  state.documents[DOCTYPE][accountId]

export const getConnectionStatus = state => {
  if (hasError(state)) return 'error'
  if (isRunning(state)) return 'ongoing'
  if (hasRun(state)) return 'done'
  return 'pending'
}

const hasError = state => {
  return !isRunning(state) && !!state.error
}

const hasRun = state => {
  return !!state.hasRun
}

export const isEnqueued = state => {
  return !!state.isEnqueued
}

const isRunning = state => {
  return !!state.isRunning
}
