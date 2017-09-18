import konnector, {
  hasRunningConnection,
  hasRunConnection
} from './konnector'

// constant
export const CREATE_CONNECTION = 'CREATE_CONNECTION'
export const UPDATE_CONNECTION_RUNNING_STATUS = 'UPDATE_CONNECTION_RUNNING_STATUS'

// reducers

const reducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CONNECTION:
    case UPDATE_CONNECTION_RUNNING_STATUS:
      if (!action.konnector || !action.konnector.slug) throw new Error('Missing konnector slug')
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
const getKonnectorIconURL = (registry, slug) => {
  const url = `assets/icons/konnectors/${slug}.svg`
  let icon = null
  try {
    icon = require(url)
  } catch (error) {
    console.warn(`Cannot get icon ${url}: ${error.message}`)
  }
  return icon
}

const getConnectionStatus = (state, key) => {
  return 'loading'
}

export const getQueue = (state, konnectorsRegistry) => {
  return Object.keys(state).reduce((runningConnections, key) => {
    const konnector = state[key]
    const label = konnectorsRegistry[key] && konnectorsRegistry[key].name
    const status = getConnectionStatus(state, key)
    const icon = getKonnectorIconURL(konnectorsRegistry, key)
    if (hasRunningConnection(konnector) || hasRunConnection(konnector)) {
      runningConnections.push({
        label,
        status,
        icon
      })
    }
    return runningConnections
  }, [])
}
