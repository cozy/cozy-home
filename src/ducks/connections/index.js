/* global cozy */
import { combineReducers } from 'redux'
import moment from 'moment'

import { getKonnectorIcon } from '../../lib/icons'
import { buildKonnectorError, isKonnectorUserError } from '../../lib/konnectors'

import { getTriggerLastJob } from '../jobs'

import { launchTrigger } from '../triggers'
import { getAccount } from '../accounts'

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
export const DELETE_CONNECTION_FAILURE = 'DELETE_CONNECTION_FAILURE'
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

const deleteAccount = async account => {
  try {
    await cozy.client.data.delete('io.cozy.accounts', account)
  } catch (error) {
    if (error.status === 409) {
      const syncedAccount = await cozy.client.data.find(
        'io.cozy.accounts',
        account._id
      )
      await cozy.client.data.delete('io.cozy.accounts', syncedAccount)
    } else {
      throw error
    }
  }
}

// reducers
const reducer = (state = {}, action) => {
  switch (action.type) {
    case CONNECTION_DELETED:
    case DELETE_CONNECTION:
    case DELETE_CONNECTION_FAILURE:
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

        const lastSyncDate =
          (isTrigger &&
            !!doc.current_state &&
            doc.current_state.last_execution) ||
          (isJob && doc.queued_at)

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
                isConnected: !error && currentStatus === 'done',
                lastSyncDate: lastSyncDate
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
    case RECEIVE_NEW_DOCUMENT: {
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
    }
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
    case DELETE_CONNECTION_FAILURE:
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
    case DELETE_CONNECTION_FAILURE:
      return {
        ...state,
        [action.trigger._id]: {
          ...state[action.trigger._id],
          isDeleting: false
        }
      }
    case CONNECTION_DELETED:
      // eslint-disable-next-line no-unused-vars
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
    return deleteAccount(account)
      .then(() =>
        dispatch({
          type: CONNECTION_DELETED,
          trigger: trigger
        })
      )
      .catch(error => {
        dispatch({
          type: DELETE_CONNECTION_FAILURE,
          trigger: trigger,
          error
        })
        throw error
      })
  }
}

export const launchTriggerAndQueue = (trigger, delay = DEFAULT_QUEUE_DELAY) => (
  dispatch,
  getState
) => {
  setTimeout(() => {
    if (isConnectionRunning(getState().connections, trigger)) {
      dispatch(enqueueConnection(trigger))
    }
  }, delay)

  return dispatch(launchTrigger(trigger))
}

// selectors
export const getConnectionsByKonnector = (
  state,
  konnectorSlug,
  validAccounts = [],
  validKonnectors = []
) => {
  const konnectorIsValid =
    !validKonnectors.length || validKonnectors.includes(konnectorSlug)
  const konnectorHasConnections =
    state.konnectors[konnectorSlug] &&
    Object.keys(state.konnectors[konnectorSlug].triggers).length
  if (!konnectorIsValid || !konnectorHasConnections) return []

  return Object.values(state.konnectors[konnectorSlug].triggers).filter(
    trigger => validAccounts.includes(trigger.account)
  )
}

export const getFirstError = (state, konnectorSlug) => {
  const firstTriggerHavingError =
    !!state.konnectors &&
    !!state.konnectors[konnectorSlug] &&
    !!state.konnectors[konnectorSlug].triggers &&
    Object.values(state.konnectors[konnectorSlug].triggers).find(
      trigger => !!trigger.error
    )
  return !!firstTriggerHavingError && firstTriggerHavingError.error
}

export const getFirstUserError = (state, konnectorSlug) => {
  const firstTriggerHavingUserError =
    !!state.konnectors &&
    !!state.konnectors[konnectorSlug] &&
    !!state.konnectors[konnectorSlug].triggers &&
    Object.values(state.konnectors[konnectorSlug].triggers).find(trigger =>
      isKonnectorUserError(trigger.error)
    )
  return firstTriggerHavingUserError && firstTriggerHavingUserError.error
}

export const getLastSyncDate = (state, konnectorSlug) => {
  const lastExecutions =
    !!state.konnectors &&
    !!state.konnectors[konnectorSlug] &&
    !!state.konnectors[konnectorSlug].triggers &&
    Object.values(state.konnectors[konnectorSlug].triggers)
      .map(trigger => trigger.lastSyncDate)
      .sort((dateA, dateB) => {
        const momentA = moment.utc(dateA)
        const momentB = moment.utc(dateB)
        return momentA.isAfter(momentB) ? -1 : momentA.isBefore(momentB) ? 1 : 0
      })
  return lastExecutions.length && lastExecutions[0]
}

// Map the trigger status to a status compatible with queue
const getTriggerQueueStatus = trigger => {
  if (trigger.isRunning) return 'ongoing'
  if (trigger.hasError) return 'error'
  if (trigger.isConnected) return 'done'
  return 'pending'
}

export const getQueue = (state, konnectors) =>
  // state is state.connections
  state.konnectors
    ? Object.keys(state.konnectors).reduce(
        (queuedConnections, konnectorSlug) => {
          const triggers = state.konnectors[konnectorSlug].triggers
          if (!triggers) return queuedConnections
          const konnector = konnectors[konnectorSlug]
          return queuedConnections.concat(
            Object.keys(triggers).reduce((queuedTriggers, triggerId) => {
              if (triggers[triggerId].isEnqueued) {
                const label = konnector.name
                const status = getTriggerQueueStatus(triggers[triggerId])
                const icon = getKonnectorIcon(konnector)
                return queuedTriggers.concat({ label, status, icon })
              }

              return queuedTriggers
            }, [])
          )
        },
        []
      )
    : []

export const getConnectionError = (state, trigger) =>
  getTriggerState(state, trigger).error

export const getCreatedAccount = state =>
  !!state.creation && state.creation.account

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
