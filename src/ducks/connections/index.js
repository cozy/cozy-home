import { combineReducers } from 'redux'
import moment from 'moment'
import omit from 'lodash/omit'
import get from 'lodash/get'
import { buildKonnectorError, isKonnectorUserError } from 'lib/konnectors'

import { getTriggerLastJob } from 'ducks/jobs'

// constant
const ACCOUNT_DOCTYPE = 'io.cozy.accounts'
const TRIGGERS_DOCTYPE = 'io.cozy.triggers'
const JOBS_DOCTYPE = 'io.cozy.jobs'

export const ENQUEUE_CONNECTION = 'ENQUEUE_CONNECTION'
export const LAUNCH_TRIGGER = 'LAUNCH_TRIGGER'
export const PURGE_QUEUE = 'PURGE_QUEUE'
export const RECEIVE_DATA = 'RECEIVE_DATA'
export const RECEIVE_NEW_DOCUMENT = 'RECEIVE_NEW_DOCUMENT'
export const RECEIVE_DELETED_DOCUMENT = 'RECEIVE_DELETED_DOCUMENT'
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
        const existingTriggers = get(
          newState,
          [konnectorSlug, 'triggers', 'data'],
          []
        )
        let rawTriggers = existingTriggers

        if (isTrigger) {
          rawTriggers = existingTriggers.filter(({ _id }) => _id !== doc._id)
          rawTriggers.push(doc)
        }
        return {
          ...newState,
          [konnectorSlug]: {
            triggers: {
              ...get(newState, [konnectorSlug, 'triggers'], []),
              data: rawTriggers,
              [triggerId]: {
                ...get(newState, [konnectorSlug, 'triggers', triggerId], {}),
                account:
                  account ||
                  get(newState, [
                    konnectorSlug,
                    'triggers',
                    triggerId,
                    'account'
                  ]),
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
    case RECEIVE_DELETED_DOCUMENT:
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
    case ENQUEUE_CONNECTION:
    case LAUNCH_TRIGGER:
    case RECEIVE_DATA:
    case RECEIVE_NEW_DOCUMENT:
    case RECEIVE_DELETED_DOCUMENT:
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
    case RECEIVE_DELETED_DOCUMENT: {
      const { data } = action.response
      const { _id, _type } = data[0]
      if (_type === TRIGGERS_DOCTYPE) {
        return omit(state, _id)
      } else return state
    }
    default:
      return state
  }
}

// action creators sync
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
  return firstTriggerHavingError ? firstTriggerHavingError.error : null
}

export const getFirstUserError = (state, konnectorSlug) => {
  const firstTriggerHavingUserError =
    !!state.konnectors &&
    !!state.konnectors[konnectorSlug] &&
    !!state.konnectors[konnectorSlug].triggers &&
    Object.values(state.konnectors[konnectorSlug].triggers).find(trigger =>
      isKonnectorUserError(trigger.error)
    )
  return firstTriggerHavingUserError ? firstTriggerHavingUserError.error : null
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
                return queuedTriggers.concat({
                  konnector,
                  label,
                  status,
                  triggerId
                })
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

export const isConnectionEnqueued = (state, trigger) =>
  getTriggerState(state, trigger).isEnqueued

export const isConnectionRunning = (state, trigger) =>
  getTriggerState(state, trigger).isRunning
