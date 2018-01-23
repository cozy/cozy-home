export const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'ENQUEUE_CONNECTION':
      return {
        ...state,
        [action.trigger._id]: {
          ...state[action.trigger._id],
          isEnqueued: true
        }
      }
    case 'LAUNCH_TRIGGER':
      return {
        ...state,
        [action.trigger._id]: {
          ...state[action.trigger._id],
          isRunning: true
        }
      }
    default:
      return state
  }
}

export default reducer
