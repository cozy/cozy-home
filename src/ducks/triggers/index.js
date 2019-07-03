import * as fromCozyClient from 'redux-cozy-client'

export const DOCTYPE = 'io.cozy.triggers'
const HOURLY_FREQUENCY = 'hourly'
const DAILY_FREQUENCY = 'daily'
const WEEKLY_FREQUENCY = 'weekly'
const MONTHLY_FREQUENCY = 'monthly'
const VALID_FREQUENCIES = [
  HOURLY_FREQUENCY,
  DAILY_FREQUENCY,
  WEEKLY_FREQUENCY,
  MONTHLY_FREQUENCY
]
const DEFAULT_FREQUENCY = WEEKLY_FREQUENCY

const triggersCollectionKey = 'triggers'

// CRUD action creators

export const fetchTriggers = () =>
  fromCozyClient.fetchTriggers(triggersCollectionKey, 'konnector')

// Helpers

const parseFrequency = frequency =>
  frequency && VALID_FREQUENCIES.includes(frequency)
    ? frequency
    : DEFAULT_FREQUENCY

export const buildTriggerFrequencyOptions = (konnector, options) => {
  const { startDate, hours, minutes } = options

  const frequencyOptions = {
    minutes,
    frequency: parseFrequency(konnector.frequency)
  }

  if (frequencyOptions.frequency === DAILY_FREQUENCY) {
    return {
      ...frequencyOptions,
      hours
    }
  }

  if (frequencyOptions.frequency === WEEKLY_FREQUENCY) {
    return {
      ...frequencyOptions,
      hours,
      dayOfWeek: startDate.getDay()
    }
  }

  if (frequencyOptions.frequency === MONTHLY_FREQUENCY) {
    return {
      ...frequencyOptions,
      hours,
      dayOfMonth: startDate.getDate()
    }
  }

  return frequencyOptions
}

function isInteger(value) {
  return (
    typeof value === 'number' &&
    Math.floor(value) === value &&
    parseInt(value, 10) === value
  )
}

export function buildKonnectorTrigger(
  konnector,
  account,
  folder,
  options = {}
) {
  const {
    dayOfMonth,
    dayOfWeek,
    hours,
    minutes
  } = buildTriggerFrequencyOptions(konnector, options)

  let workerArguments = {
    konnector: konnector.slug || konnector.attributes.slug,
    account: account._id
  }

  if (folder) {
    workerArguments['folder_to_save'] = folder._id
  }

  return {
    _type: DOCTYPE,
    attributes: {
      type: '@cron',
      arguments: `0 ${isInteger(minutes) ? minutes : 0} ${
        isInteger(hours) ? hours : '*'
      } ${isInteger(dayOfMonth) ? dayOfMonth : '*'} * ${
        isInteger(dayOfWeek) ? dayOfWeek : '*'
      }`,
      worker: 'konnector',
      worker_arguments: workerArguments
    }
  }
}

// selectors
export const getKonnectorTriggers = (
  state,
  konnector,
  existingAccountIds = []
) => {
  return (
    (!!state.documents[DOCTYPE] &&
      Object.values(state.documents[DOCTYPE]).filter(trigger => {
        return (
          trigger.worker === 'konnector' &&
          trigger.message &&
          trigger.message.konnector === konnector.slug &&
          trigger.message.account &&
          existingAccountIds.includes(trigger.message.account)
        )
      })) ||
    []
  )
}

export const getTrigger = (state, id) =>
  !!state.documents &&
  !!state.documents[DOCTYPE] &&
  state.documents[DOCTYPE][id]
