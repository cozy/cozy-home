import { createTrigger, fetchCollection } from 'redux-cozy-client'

export const DOCTYPE = 'io.cozy.triggers'
const triggersCollectionKey = 'triggers'

export const fetchTriggers = () =>
  fetchCollection(triggersCollectionKey, DOCTYPE)
export const createKonnectorTrigger = (
  konnector,
  account,
  folder,
  options = {}
) =>
  createTrigger(buildKonnectorTrigger(konnector, account, folder, options), {
    updateCollections: [triggersCollectionKey]
  })

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
      workerArguments: workerArguments
    }
  }
}
