import { combineReducers } from 'redux'

import { getKonnectorIcon } from '../../lib/icons'
import { buildKonnectorError } from '../../lib/konnectors'

import { getTriggerLastJob } from '../jobs'
import { getKonnectorAccount } from './konnector'

import { deleteTrigger, launchTrigger } from '../triggers'
import { deleteAccount, getAccount } from '../accounts'

// constant
const ACCOUNT_DOCTYPE = 'io.cozy.accounts'
const TRIGGERS_DOCTYPE = 'io.cozy.triggers'
const JOBS_DOCTYPE = 'io.cozy.jobs'

// Delay until the konnector is queued. It is used to compensate the fact that
// we cannot determine when a login is OK for the konnector.
export const DEFAULT_QUEUE_DELAY = 7000

export const CREATE_CONNECTION = 'CREATE_CONNECTION'
export const CONNECTION_DELETED = 'CONNECTION_DELETED'
export const DELETE_CONNECTION = 'DELETE_CONNECTION'
export const ENQUEUE_CONNECTION = 'ENQUEUE_CONNECTION'
export const LAUNCH_TRIGGER = 'LAUNCH_TRIGGER'
export const PURGE_QUEUE = 'PURGE_QUEUE'
export const RECEIVE_DATA = 'RECEIVE_DATA'
export const RECEIVE_NEW_DOCUMENT = 'RECEIVE_NEW_DOCUMENT'
export const UPDATE_CONNECTION_RUNNING_STATUS =
  'UPDATE_CONNECTION_RUNNING_STATUS'
export const UPDATE_CONNECTION_ERROR = 'UPDATE_CONNECTION_ERROR'
export const START_CONNECTION_CREATION = 'START_CONNECTION_CREATION'
export const END_CONNECTION_CREATION = 'END_CONNECTION_CREATION'

// Helpers
const getTriggerKonnectorSlug = trigger =>
  (trigger && trigger.message && trigger.message.konnector) || null

const isKonnectorTrigger = doc =>
  doc._type === TRIGGERS_DOCTYPE && !!doc.message && !!doc.message.konnector

const isKonnectorJob = doc =>
  doc._type === JOBS_DOCTYPE && doc.worker === 'konnector'

// reducers
const reducer = (state = {}, action) => {
  switch (action.type) {
    case CONNECTION_DELETED:
    case DELETE_CONNECTION:
      if (!action.trigger || !action.trigger._id)
        throw new Error('Missing trigger id')
      if (!action.trigger.message || !action.trigger.message.konnector)
        throw new Error('Malformed trigger message')
      return {
        ...state,
        [getTriggerKonnectorSlug(action.trigger)]: konnectorReducer(
          state[getTriggerKonnectorSlug(action.trigger)],
          action
        )
      }
    case CREATE_CONNECTION:
    case ENQUEUE_CONNECTION:
    case UPDATE_CONNECTION_ERROR:
    case UPDATE_CONNECTION_RUNNING_STATUS:
    case LAUNCH_TRIGGER:
      // Trigger is launched, connection should be running.
      if (!action.trigger || !action.trigger._id)
        throw new Error('Missing trigger id')
      if (!action.trigger.message || !action.trigger.message.konnector)
        throw new Error('Malformed trigger message')
      return {
        ...state,
        [getTriggerKonnectorSlug(action.trigger)]: konnectorReducer(
          state[getTriggerKonnectorSlug(action.trigger)],
          action
        )
      }

    case RECEIVE_DATA:
    case RECEIVE_NEW_DOCUMENT:
      if (
        !action.response ||
        !action.response.data ||
        !action.response.data.length
      ) {
        return state
      }

      return action.response.data.reduce((newState, doc) => {
        const isTrigger = isKonnectorTrigger(doc)
        const isJob = isKonnectorJob(doc)
        // Ignore non triggers or non jobs
        if (!isTrigger && !isJob) return newState
        const konnectorSlug = doc.message.konnector
        const triggerId = (isTrigger && doc._id) || (isJob && doc.trigger_id)
        if (!triggerId) return newState

        const account = isTrigger && !!doc.message && doc.message.account

        const currentStatus =
          (isTrigger && (doc.current_state && doc.current_state.status)) ||
          (isJob && doc.state)
        if (!currentStatus) return newState

        const error =
          (isTrigger &&
            !!doc.current_state &&
            doc.current_state.status !== 'done' &&
            !!doc.current_state.last_error &&
            buildKonnectorError(doc.current_state.last_error)) ||
          (isJob && !!doc.error && buildKonnectorError(doc.error)) ||
          null

        return {
          ...newState,
          [konnectorSlug]: {
            triggers: {
              ...((newState[konnectorSlug] &&
                newState[konnectorSlug].triggers) ||
                {}),
              [triggerId]: {
                ...((newState[konnectorSlug] &&
                  newState[konnectorSlug].triggers &&
                  newState[konnectorSlug].triggers[triggerId]) ||
                  {}),
                account:
                  account ||
                  (newState[konnectorSlug] &&
                    newState[konnectorSlug].triggers &&
                    newState[konnectorSlug].triggers[triggerId] &&
                    newState[konnectorSlug].triggers[triggerId].account),
                error,
                hasError: !!error || currentStatus === 'errored',
                isRunning: ['queued', 'running'].includes(currentStatus),
                isConnected: !error && currentStatus === 'done'
              }
            }
          }
        }
      }, state)

    case PURGE_QUEUE:
      return Object.keys(state).reduce((konnectors, slug) => {
        return {
          ...konnectors,
          [slug]: konnectorReducer(state[slug], action)
        }
      }, state)

    default:
      return state
  }
}

const creation = (state = null, action) => {
  switch (action.type) {
    case RECEIVE_DATA:
    case RECEIVE_NEW_DOCUMENT:
      if (!state) return null
      if (
        !action.response ||
        !action.response.data ||
        action.response.data.length !== 1
      ) {
        return state
      }

      const doc = action.response.data[0]
      const isAccount = doc._type === ACCOUNT_DOCTYPE

      if (isAccount)
        return {
          ...state,
          account: doc._id
        }

      const isTrigger = isKonnectorTrigger(doc)
      if (isTrigger)
        return {
          ...state,
          trigger: doc._id
        }

      return state

    case START_CONNECTION_CREATION:
      // Store all data related to the creation of a new connection in then
      // property `creation`
      // While a new connection is being configured, new trigger and account
      // are store here
      return {}
    case END_CONNECTION_CREATION:
      return null
    default:
      return state
  }
}

export default combineReducers({
  creation,
  konnectors: reducer
})

// sub(?) reducers
const konnectorReducer = (state = {}, action) => {
  switch (action.type) {
    case CONNECTION_DELETED:
    case DELETE_CONNECTION:
    case ENQUEUE_CONNECTION:
    case LAUNCH_TRIGGER:
    case RECEIVE_DATA:
    case RECEIVE_NEW_DOCUMENT:
    case PURGE_QUEUE:
      // We assume that document being a trigger has already been validated.
      return {
        ...state,
        triggers: triggersReducer(state.triggers, action)
      }
    default:
      return state
  }
}

const triggersReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CONNECTION:
      return {
        ...state,
        [action.trigger._id]: {
          ...state[action.trigger._id],
          isDeleting: true
        }
      }
    case CONNECTION_DELETED:
      return (({ [action.trigger._id]: deleted, ...state }) => state)(state)
    case ENQUEUE_CONNECTION:
      return {
        ...state,
        [action.trigger._id]: {
          ...state[action.trigger._id],
          isEnqueued: true
        }
      }
    case LAUNCH_TRIGGER:
      return {
        ...state,
        [action.trigger._id]: {
          ...state[action.trigger._id],
          account: action.trigger.message.account,
          isRunning: true
        }
      }
    case PURGE_QUEUE:
      return state
        ? Object.keys(state).reduce((newState, triggerId) => {
            return {
              ...newState,
              [triggerId]: {
                ...newState[triggerId],
                isEnqueued: false
              }
            }
          }, state)
        : state
    default:
      return state
  }
}

// action creators sync
export const createConnection = (konnector, account, folder) => ({
  type: CREATE_CONNECTION,
  konnector,
  account,
  folder
})

export const enqueueConnection = trigger => ({
  type: ENQUEUE_CONNECTION,
  trigger
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

export const startConnectionCreation = konnector => ({
  type: START_CONNECTION_CREATION,
  konnector
})

export const endConnectionCreation = () => ({
  type: END_CONNECTION_CREATION
})

// action creators async
export const deleteConnection = trigger => {
  return (dispatch, getState) => {
    dispatch({
      type: DELETE_CONNECTION,
      trigger: trigger
    })
    const account = getTriggerAccount(getState(), trigger)
    return dispatch(deleteAccount(account))
      .then(() => {
        dispatch(deleteTrigger(trigger))
      })
      .then(() =>
        dispatch({
          type: CONNECTION_DELETED,
          trigger: trigger
        })
      )
    // .then(() => dispatch(unlinkFolder(account, folder)))
  }
}

export const launchTriggerAndQueue = (trigger, delay = DEFAULT_QUEUE_DELAY) => (
  dispatch,
  getState,
  options
) => {
  setTimeout(() => {
    if (isConnectionRunning(getState().connections, trigger)) {
      dispatch(enqueueConnection(trigger))
    }
  }, delay)

  return dispatch(launchTrigger(trigger))
}

// selectors

// Retrieves all the connections, return an array of JS object with three
// properties : `{ accountId, konnectorSlug, triggerId }`
export const getConnections = (
  state,
  validAccounts = [],
  validKonnectors = []
) =>
  state.konnectors
    ? Object.keys(state.konnectors).reduce((connections, konnectorSlug) => {
        return connections.concat(
          state.konnectors[konnectorSlug].triggers
            ? Object.keys(state.konnectors[konnectorSlug].triggers).reduce(
                (connections, triggerId) => {
                  const accountId =
                    state.konnectors[konnectorSlug].triggers[triggerId].account

                  const isValidAccount =
                    accountId && validAccounts.includes(accountId)

                  const isValidKonnector =
                    konnectorSlug && validKonnectors.includes(konnectorSlug)

                  return isValidKonnector && isValidAccount
                    ? connections.concat([
                        {
                          accountId,
                          konnectorSlug,
                          triggerId
                        }
                      ])
                    : connections
                },
                []
              )
            : []
        )
      }, [])
    : []

export const getConnectionStatus = (
  state,
  konnector,
  existingAccountIds = []
) => {
  // Sould we access `state.connections` from here ?
  const triggers =
    state.konnectors[konnector.slug] &&
    state.konnectors[konnector.slug].triggers

  if (!triggers) return null

  const validTriggers = Object.keys(triggers).filter(triggerId => {
    return existingAccountIds.includes(triggers[triggerId].account)
  })

  if (!validTriggers.length) return null

  const triggerId = validTriggers[0]

  return getTriggerConnectionStatus(triggers[triggerId])
}

export const getConnectionStatusForTrigger = (state, trigger) => {
  if (!trigger) return null
  const { konnector } = trigger.message
  return getTriggerConnectionStatus(
    !!state.konnectors &&
      !!state.konnectors[konnector] &&
      !!state.konnectors[konnector].triggers &&
      state.konnectors[konnector].triggers[trigger._id]
  )
}

export const getKonnectorConnectedAccount = (state, konnector) => {
  return getKonnectorAccount(state.konnectors[konnector.slug])
}

// Map the trigger status to a status compatible with queue
const getTriggerQueueStatus = trigger => {
  if (trigger.isRunning) return 'ongoing'
  if (trigger.hasError) return 'error'
  if (trigger.isConnected) return 'done'
  return 'pending'
}

const getTriggerConnectionStatus = trigger => {
  if (trigger.isRunning) return 'running'
  if (trigger.isConnected) return 'connected'
  return 'errored'
}

export const getQueue = (state, registryKonnectors) =>
  // state is state.connections
  state.konnectors
    ? Object.keys(state.konnectors).reduce(
        (queuedConnections, konnectorSlug) => {
          const triggers = state.konnectors[konnectorSlug].triggers
          if (!triggers) return queuedConnections
          const registryKonnector = registryKonnectors.data[konnectorSlug]
          return queuedConnections.concat(
            Object.keys(triggers).reduce((queuedTriggers, triggerId) => {
              if (triggers[triggerId].isEnqueued) {
                const label = registryKonnector.name
                const status = getTriggerQueueStatus(triggers[triggerId])
                const icon = getKonnectorIcon(registryKonnector)
                return queuedTriggers.concat({ label, status, icon })
              }

              return queuedTriggers
            }, [])
          )
        },
        []
      )
    : []

export const getConfiguredKonnectors = (state, existingAccountIds = []) =>
  state.konnectors
    ? Object.keys(state.konnectors).filter(
        konnectorSlug =>
          !!state.konnectors &&
          !!state.konnectors[konnectorSlug] &&
          !!Object.keys(
            state.konnectors.konnectors[konnectorSlug].triggers
          ).find(triggerId => {
            const connection =
              state.konnectors[konnectorSlug].triggers[triggerId]
            return (
              existingAccountIds.includes(connection.account) &&
              (connection.isConnected ||
                connection.isRunning ||
                connection.isEnqueued ||
                connection.hasError)
            )
          })
      )
    : []

export const getConnectionError = (state, trigger) =>
  getTriggerState(state, trigger).error

export const getCreatedAccount = state =>
  !!state.creation && state.creation.account
export const getCreatedTrigger = state =>
  !!state.creation && state.creation.trigger

export const getTriggerAccount = (state, trigger) => {
  return getAccount(state.cozy, trigger.message.account)
}

export const getTriggerIdByKonnectorAndAccount = (
  state,
  konnector,
  account,
  validAccounts = []
) =>
  !!konnector &&
  !!account &&
  validAccounts.includes(account._id) &&
  !!state.konnectors[konnector.slug] &&
  Object.keys(state.konnectors[konnector.slug].triggers).find(
    triggerId =>
      state.konnectors[konnector.slug].triggers[triggerId].account ===
      account._id
  )

export const getTriggerLastSuccess = (state, trigger) => {
  const lastJob = getTriggerLastJob(state, trigger)
  const lastJobIsSuccess = lastJob && lastJob.state === 'done'
  if (lastJobIsSuccess) return lastJob.started_at
  return (
    !!trigger && !!trigger.current_state && trigger.current_state.last_success
  )
}

export const getConnectionsStatusesByKonnectors = (state, konnectorSlugs) =>
  konnectorSlugs.map(slug => {
    return getConnectionStatus(state, slug)
  })

// get trigger from state, in state.konnectors[konnectorSlug].triggers[triggerId]
const getTriggerState = (state, trigger) => {
  const konnectorSlug = getTriggerKonnectorSlug(trigger)
  if (!konnectorSlug || !state.konnectors || !state.konnectors[konnectorSlug])
    return false
  const triggers = state.konnectors[konnectorSlug].triggers
  if (!triggers) return false
  return (!!triggers && !!triggers[trigger._id] && triggers[trigger._id]) || {}
}

export const isCreatingConnection = state => !!state.creation

export const isConnectionConnected = (state, trigger) =>
  getTriggerState(state, trigger).isConnected

export const isConnectionDeleting = (state, trigger) =>
  getTriggerState(state, trigger).isDeleting

export const isConnectionEnqueued = (state, trigger) =>
  getTriggerState(state, trigger).isEnqueued

export const isConnectionRunning = (state, trigger) =>
  getTriggerState(state, trigger).isRunning
