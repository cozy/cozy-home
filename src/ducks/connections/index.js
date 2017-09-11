import konnector from './konnector'

// constant
export const CREATE_CONNECTION = 'CREATE_CONNECTION'
export const UPDATE_CONNECTION_RUNNING_STATUS = 'UPDATE_CONNECTION_RUNNING_STATUS'

// reducers

const reducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CONNECTION:
    case UPDATE_CONNECTION_RUNNING_STATUS:
      return { ...state, [action.konnector.slug]: konnector(state[action.konnector.slug], action) }
    default:
      return state
  }
}

export default reducer

// action creators sync
export const createConnection = (konnector, account, folder) => ({
  type: CREATE_CONNECTION,
  konnector,
  account,
  folder
})

export const updateConnectionRunningStatus = (konnector, account, isRunning = false) => ({
  type: UPDATE_CONNECTION_RUNNING_STATUS,
  konnector,
  account,
  isRunning
})

// selectors
export const isRunning = (state, konnector) =>
  state.konnectors &&
    state.konnectors[konnector.slug] &&
      state.konnectors[konnector.slug].running
