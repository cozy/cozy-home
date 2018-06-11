import * as fromCozyClient from 'redux-cozy-client'

export const DOCTYPE = 'io.cozy.triggers'
const HOURLY_FREQUENCY = 'hourly'
const DAILY_FREQUENCY = 'daily'
const WEEKLY_FREQUENCY = 'weekly'
const VALID_FREQUENCIES = [HOURLY_FREQUENCY, DAILY_FREQUENCY, WEEKLY_FREQUENCY]
const DEFAULT_FREQUENCY = WEEKLY_FREQUENCY

const triggersCollectionKey = 'triggers'

// CRUD action creators

export const fetchTriggers = () =>
  fromCozyClient.fetchTriggers(triggersCollectionKey, 'konnector')

export const createKonnectorTrigger = (
  konnector,
  account,
  folder,
  options = {}
) =>
  fromCozyClient.createTrigger(
    buildKonnectorTrigger(konnector, account, folder, options),
    {
      updateCollections: [triggersCollectionKey]
    }
  )

export const deleteTrigger = trigger =>
  fromCozyClient.deleteTrigger(trigger, {
    updateCollections: [triggersCollectionKey]
  })

export const launchTrigger = trigger => fromCozyClient.launchTrigger(trigger)

// Helpers

const parseFrequency = frequency =>
  frequency && VALID_FREQUENCIES.includes(frequency)
    ? frequency
    : DEFAULT_FREQUENCY

export const buildTriggerFrequencyOptions = (konnector, options) => {
  const { day, hours, minutes } = options

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
      day
    }
  }

  return frequencyOptions
}

export function buildKonnectorTrigger(
  konnector,
  account,
  folder,
  options = {}
) {
  const { day, hours, minutes } = buildTriggerFrequencyOptions(
    konnector,
    options
  )

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
      arguments: `0 ${minutes || 0} ${hours || '*'} * * ${day || '*'}`,
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
