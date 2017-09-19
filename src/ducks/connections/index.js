import konnector, {
  getConnectionStatus,
  hasError,
  hasQueuedConnection,
  hasRunningConnection,
  hasRunConnection
} from './konnector'

// constant
export const CREATE_CONNECTION = 'CREATE_CONNECTION'
export const ENQUEUE_CONNECTION = 'ENQUEUE_CONNECTION'
export const UPDATE_CONNECTION_RUNNING_STATUS = 'UPDATE_CONNECTION_RUNNING_STATUS'
export const UPDATE_CONNECTION_ERROR = 'UPDATE_CONNECTION_ERROR'

// reducers

const reducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CONNECTION:
    case ENQUEUE_CONNECTION:
    case UPDATE_CONNECTION_ERROR:
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

export const enqueueConnection = (konnector, account) => ({
  type: ENQUEUE_CONNECTION,
  konnector,
  account
})

export const updateConnectionError = (konnector, account, error) => ({
  type: UPDATE_CONNECTION_ERROR,
  konnector,
  account,
  error
})

export const updateConnectionRunningStatus = (konnector, account, isRunning = false) => ({
  type: UPDATE_CONNECTION_RUNNING_STATUS,
  konnector,
  account,
  isRunning
})

// selectors
const getKonnectorIconURL = (registry, slug) => {
  let icon = null
  try {
    icon = require(`../../assets/icons/konnectors/${slug}.svg`)
  } catch (error) {
    console.warn(`Cannot get icon ${slug}: ${error.message}`)
  }
  return icon
}

const queueStatuses = {
  done: 'loaded',
  error: 'failed',
  running: 'loading'
}

export const getQueue = (state, konnectorsRegistry) => {
  return Object.keys(state).reduce((runningConnections, key) => {
    const konnector = state[key]
    const label = konnectorsRegistry[key] && konnectorsRegistry[key].name
    const connectionStatus = getConnectionStatus(state[key])
    const status = queueStatuses[connectionStatus] || connectionStatus
    const icon = getKonnectorIconURL(konnectorsRegistry, key)
    if (hasQueuedConnection(konnector)) {
      runningConnections.push({
        label,
        status,
        icon
      })
    }
    return runningConnections
  }, [])
}

export const getRun = (state) => {
  return Object.keys(state).reduce((numRunConnections, slug) => {
    const konnector = state[slug]
    return (hasRunConnection(konnector) && !hasRunningConnection(konnector))
      ? numRunConnections + 1
        : numRunConnections
  }, 0)
}

export const getSuccessfulRun = (state) => {
  return Object.keys(state).reduce((numRunConnections, slug) => {
    const konnector = state[slug]
    return (hasRunConnection(konnector) && !hasError(konnector))
      ? numRunConnections + 1
        : numRunConnections
  }, 0)
}
