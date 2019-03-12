const RECEIVE_APPS = 'RECEIVE_APPS'

const reducer = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_APPS:
      return action.apps || state
    default:
      return state
  }
}

export default reducer

// Action creators
export const receiveApps = apps => ({
  type: RECEIVE_APPS,
  apps
})

// Selectors
export const getApp = (state = [], slug) => state.find(app => app.slug === slug)
