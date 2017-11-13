import * as fromCozyClient from 'redux-cozy-client'
import { getAccount } from '../accounts'

export const DOCTYPE = 'io.cozy.triggers'
const triggersCollectionKey = 'triggers'

export const fetchTriggers = () =>
  fromCozyClient.fetchCollection(triggersCollectionKey, DOCTYPE)

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

export const launchTrigger = trigger => fromCozyClient.launchTrigger(trigger)

// Helpers

export function buildKonnectorTrigger(
  konnector,
  account,
  folder,
  options = {}
) {
  const { day, hours, minutes } = options

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
      arguments: `0 ${minutes || 0} ${hours || 0} * * ${day || '*'}`,
      worker: 'konnector',
      worker_arguments: workerArguments
    }
  }
}

// selectors

export const getKonnectorConnectedAccount = (state, konnector) => {
  // state is state.cozy
  const trigger = getTriggerByKonnector(state, konnector)

  if (!trigger) return null

  return getAccount(state, trigger.message.account)
}

export const getTriggerByKonnector = (state, konnector) => {
  // state is state.cozy
  if (!state.documents || !state.documents[DOCTYPE]) return null
  const trigger = Object.values(state.documents[DOCTYPE]).find(trigger => {
    return (
      trigger.worker === 'konnector' &&
      trigger.message &&
      trigger.message.konnector === konnector.slug
    )
  })

  return trigger
}
