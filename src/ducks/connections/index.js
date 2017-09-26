import konnector, {
  getQueuedConnections
} from './konnector'

// constant
export const CREATE_CONNECTION = 'CREATE_CONNECTION'
export const ENQUEUE_CONNECTION = 'ENQUEUE_CONNECTION'
export const PURGE_QUEUE = 'PURGE_QUEUE'
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
    case PURGE_QUEUE:
      return Object.keys(state).reduce((konnectors, slug) => {
        return { ...konnectors, [slug]: konnector(state[slug], action) }
      }, state)
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

export const purgeQueue = () => ({
  type: PURGE_QUEUE
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
export const getQueue = (state, konnectorsRegistry) => {
  return Object.keys(state).reduce((runningConnections, konnectorSlug) => {
    const konnectorAccounts = state[konnectorSlug]
    return runningConnections.concat(getQueuedConnections(konnectorAccounts, konnectorsRegistry[konnectorSlug]))
  }, [])
}
