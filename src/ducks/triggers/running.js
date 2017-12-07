export const reducer = (state = [], action) => {
  switch (action.type) {
    case 'LAUNCH_TRIGGER':
      return [...state, action.trigger._id]
  }
}

export default reducer

// selectors

export const isTriggerRunning = (state = [], trigger) =>
  trigger && state.includes(trigger._id)
