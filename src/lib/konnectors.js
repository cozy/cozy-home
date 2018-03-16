/* konnector lib ready to be added to cozy-client-js */
import * as realtime from './realtime'
import * as jobs from './jobs'

export const ERROR_TYPES = {
  LOGIN_FAILED: 'LOGIN_FAILED',
  MAINTENANCE: 'MAINTENANCE',
  NOT_EXISTING_DIRECTORY: 'NOT_EXISTING_DIRECTORY',
  USER_ACTION_NEEDED: 'USER_ACTION_NEEDED'
}

export const KONNECTORS_DOCTYPE = 'io.cozy.konnectors'
export const KONNECTORS_RESULT_DOCTYPE = 'io.cozy.konnectors.result'

export const KONNECTOR_STATE = {
  // Available state
  AVAILABLE: 'available',
  INSTALLING: 'installing',
  UPGRADING: 'upgrading',
  UNINSTALLING: 'uninstalling',
  // Installed state, can be used to state that an application has been
  // installed but needs a user interaction to be activated and "ready".
  INSTALLED: 'installed',
  READY: 'ready'
}

export const KONNECTOR_RESULT_STATE = {
  ERRORED: 'errored',
  CONNECTED: 'done'
}

export const JOB_STATE = {
  READY: 'ready',
  ERRORED: 'errored',
  DONE: 'done'
}

function sanitizeSlug(konnector) {
  return (
    konnector && {
      ...konnector,
      slug: konnector.slug || konnector.attributes.slug
    }
  )
}

export function fetchManifest(cozy, source) {
  return source
    ? cozy.fetchJSON(
        'GET',
        `/konnectors/manifests?Source=${encodeURIComponent(source)}`
      )
    : Promise.reject(
        new Error('A source must be provided to fetch the konnector manifest')
      )
}

let cachedSlugIndex
function getSlugIndex(cozy) {
  return cachedSlugIndex
    ? Promise.resolve(cachedSlugIndex)
    : cozy.data.defineIndex(KONNECTORS_DOCTYPE, ['slug']).then(index => {
        cachedSlugIndex = index
        return index
      })
}

export function findBySlug(cozy, slug) {
  if (!slug) throw new Error('Missing `slug` parameter')

  return getSlugIndex(cozy)
    .then(index => cozy.data.query(index, { selector: { slug: slug } }))
    .then(list => (list.length ? list[0] : null))
    .then(konnector => sanitizeSlug(konnector))
}

export function unlinkFolder(cozy, konnector, folderId) {
  return !konnector._id
    ? /**
     * In case of a konnector set in the app and not in the platform,
     * there's no available `_id`. So we should returns an error, but here
     * it's just a warning, that doesn't implies anything, so we `resolve` and
     * not `reject`, because of what the next steps of deleting accounts will
     * fail.
     */
      Promise.resolve(new Error("konnector doesn't have available id"))
    : cozy
        .fetchJSON(
          'DELETE',
          `/data/io.cozy.konnectors/${encodeURIComponent(
            konnector._id
          )}/relationships/references`,
          {
            data: [
              {
                type: 'io.cozy.files',
                id: folderId
              }
            ]
          }
        )
        .then(() => deleteFolderPermission(cozy, konnector))
}

export function fetchResult(cozy, konnector) {
  if (!konnector) return Promise.reject(new Error('No konnector'))
  const slug = konnector.slug || konnector.attributes.slug
  return cozy.data.find(KONNECTORS_RESULT_DOCTYPE, slug)
}

export function findAll(cozy) {
  return findAllDocuments(cozy, KONNECTORS_DOCTYPE).then(konnectors =>
    konnectors.map(sanitizeSlug)
  )
}

export function findAllResults(cozy) {
  return findAllDocuments(cozy, KONNECTORS_RESULT_DOCTYPE)
}

function findAllDocuments(cozy, doctype) {
  return cozy
    .fetchJSON('GET', `/data/${doctype}/_all_docs?include_docs=true`)
    .then(result => {
      return result.rows
        ? result.rows
            // filter documents only
            .filter(row => !row.doc.language)
            .map(row => row.doc)
        : []
    })
    .catch(error => {
      // the _all_docs endpoint returns a 404 error if no document with the given
      // doctype exists.
      if (error.status === 404) return []
      throw error
    })
}

export function subscribeAll(cozy) {
  return realtime.subscribeAll(cozy, KONNECTORS_DOCTYPE)
}

export function subscribeAllResults(cozy) {
  return realtime.subscribeAll(cozy, KONNECTORS_RESULT_DOCTYPE)
}

export function install(cozy, konnector, timeout = 120000) {
  ;['slug', 'source'].forEach(property => {
    if (!konnector[property])
      throw new Error(`Missing '${property}' property in konnector`)
  })

  const { slug, source, parameters } = konnector
  let urlParams = `Source=${encodeURIComponent(source)}`

  // While the registry is not there, the parameters are passed at konnectors install
  if (parameters) {
    urlParams =
      urlParams +
      `&Parameters=${encodeURIComponent(JSON.stringify(parameters))}`
  }

  return findBySlug(cozy, slug)
    .catch(error => {
      if (error.status !== '404') throw error
      return null
    })
    .then(
      konnector =>
        konnector
          ? // Need JSONAPI format
            cozy.data.find(KONNECTORS_DOCTYPE, konnector._id)
          : cozy.fetchJSON('POST', `/konnectors/${slug}?${urlParams}`)
    )
    .then(konnector => waitForKonnectorReady(cozy, konnector, timeout))
    .then(sanitizeSlug)
}

// monitor the status of the connector and resolve when the connector is ready
function waitForKonnectorReady(cozy, konnector, timeout) {
  return new Promise((resolve, reject) => {
    const idTimeout = setTimeout(() => {
      reject(new Error('Konnector installation timed out'))
    }, timeout)

    const idInterval = setInterval(() => {
      cozy.data
        .find(KONNECTORS_DOCTYPE, konnector._id)
        .then(konnectorResponse => {
          if (konnectorResponse.state === KONNECTOR_STATE.READY) {
            clearTimeout(idTimeout)
            clearInterval(idInterval)
            resolve(konnector)
          }
        })
        .catch(error => {
          if (error.status === 404) return // keep waiting
          clearTimeout(idTimeout)
          clearInterval(idInterval)
          reject(error)
        })
    }, 1000)
  })
}

function patchFolderPermission(cozy, konnector, folderId = null) {
  const slug = konnector.attributes ? konnector.attributes.slug : konnector.slug
  const saveFolder = folderId
    ? { type: 'io.cozy.files', values: [folderId] }
    : {}

  return cozy.fetchJSON(
    'PATCH',
    `/permissions/konnectors/${encodeURIComponent(slug)}`,
    {
      data: {
        attributes: {
          permissions: {
            saveFolder: saveFolder
          }
        }
      }
    }
  )
}

export function addFolderPermission(cozy, konnector, folderId) {
  return patchFolderPermission(cozy, konnector, folderId)
}

export function deleteFolderPermission(cozy, konnector) {
  return patchFolderPermission(cozy, konnector)
}

export function run(cozy, konnector, account) {
  const slug = konnector.attributes ? konnector.attributes.slug : konnector.slug
  if (!slug) {
    throw new Error('Missing `slug` parameter for konnector')
  }
  if (!account._id) throw new Error('Missing `_id` parameter for account')

  const jobAttributes = {
    konnector: slug,
    account: account._id
  }

  if (account.folderId) {
    jobAttributes['folder_to_save'] = account.folderId
  }

  return cozy.jobs
    .create('konnector', jobAttributes, {
      priority: 10,
      max_exec_count: 1
    })
    .then(job => waitForJobFinished(cozy, job))
}

// monitor the status of the connector and resolve when the connector is ready
function waitForJobFinished(cozy, job) {
  return new Promise((resolve, reject) => {
    jobs
      .subscribe(cozy, job)
      .then(subscription => {
        subscription.onUpdate(job => {
          if (job.state === JOB_STATE.ERRORED) {
            subscription.unsubscribe()
            reject(new Error(job.error))
          }

          if (job.state === JOB_STATE.DONE) {
            subscription.unsubscribe()
            resolve(job)
          }
        })
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function createTrigger(cozy, konnector, account, folder, options = {}) {
  const { frequency, day, hours, minutes } = options

  let workerArguments = {
    konnector: konnector.slug || konnector.attributes.slug,
    account: account._id
  }

  if (folder) {
    workerArguments['folder_to_save'] = folder._id
  }

  return cozy.fetchJSON('POST', '/jobs/triggers', {
    data: {
      attributes: {
        type: '@cron',
        frequency: frequency,
        arguments: `0 ${minutes || 0} ${hours || 0} * * ${day || '*'}`,
        worker: 'konnector',
        worker_arguments: workerArguments
      }
    }
  })
}

export function isKonnectorLoginError(error) {
  return error && error.type && error.type === ERROR_TYPES.LOGIN_FAILED
}

export function isKonnectorUserError(error) {
  return (
    error &&
    error.type &&
    [ERROR_TYPES.LOGIN_FAILED, ERROR_TYPES.USER_ACTION_NEEDED].includes(
      error.type
    )
  )
}

export function isKonnectorKnownError(error) {
  return error && error.type && Object.keys(ERROR_TYPES).includes(error.type)
}

export function buildKonnectorError(message) {
  var error = new Error(message)
  error.type = message.split('.')[0]
  error.code = message
  return error
}

const checkLocale = (t, key) => {
  return t(key) !== key
}

export const getMostAccurateErrorKey = (t, error, getKey = key => key) => {
  // Legacy. Kind of.
  if (!error.code) return error.message

  const errorSegments = error.code.split('.')

  let tested = errorSegments
  let fullKey = getKey(tested.join('.'))

  while (tested.length && !checkLocale(t, fullKey)) {
    tested = tested.slice(0, tested.length - 1)
    fullKey = getKey(tested.join('.'))
  }

  return fullKey || errorSegments[0]
}
