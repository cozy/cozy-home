import {
  CREATE_CONNECTION,
  UPDATE_CONNECTION_RUNNING_STATUS
} from './'

import account from './account'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CONNECTION:
    case UPDATE_CONNECTION_RUNNING_STATUS:
      return { ...state, [action.account._id]: account(state[action.account._id], action) }
    default:
      return state
  }
}

export default reducer
