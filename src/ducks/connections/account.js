import {
  CREATE_CONNECTION,
  UPDATE_CONNECTION_RUNNING_STATUS
} from './'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CONNECTION:
    case UPDATE_CONNECTION_RUNNING_STATUS:
      const { isRunning } = action
      return { ...state, isRunning }
    default:
      return state
  }
}

export default reducer
