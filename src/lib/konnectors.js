/* konnector lib ready to be added to cozy-client-js */
import * as realtime from './realtime'
import * as jobs from './jobs'

export const KONNECTORS_DOCTYPE = 'io.cozy.konnectors'
export const KONNECTORS_RESULT_DOCTYPE = 'io.cozy.konnectors.result'

export const KONNECTOR_STATE = {
  READY: 'ready',
  ERRORED: 'errored'
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

export function addAccount (cozy, konnector, account) {
  if (!konnector.accounts) konnector.accounts = []
  konnector.accounts.push(account)
  return Promise.resolve(konnector)
}

export function fetchManifest (cozy, source) {
  return source
    ? cozy.fetchJSON('GET', `/konnectors/manifests?Source=${encodeURIComponent(source)}`)
    : Promise.reject(new Error('Source konnector is unavailable'))
}

let cachedSlugIndex
function getSlugIndex (cozy) {
  return cachedSlugIndex
    ? Promise.resolve(cachedSlugIndex)
      : cozy.data.defineIndex(KONNECTORS_DOCTYPE, ['slug'])
          .then(index => {
            cachedSlugIndex = index
            return index
          })
}

export function findBySlug (cozy, slug) {
  if (!slug) throw new Error('Missing `slug` parameter')

  return getSlugIndex(cozy)
    .then(index => cozy.data.query(index, {selector: {slug: slug}}))
    .then(list => list.length ? list[0] : null)
}

export function unlinkFolder (cozy, konnector, folderId) {
  return !konnector._id
    /**
     * In case of a konnector set in the app and not in the platform,
     * there's no available `_id`. So we should returns an error, but here
     * it's just a warning, that doesn't implies anything, so we `resolve` and
     * not `reject`, because of what the next steps of deleting accounts will
     * fail.
     */
    ? Promise.resolve(new Error("konnector doesn't have available id"))
    : cozy.fetchJSON(
      'DELETE',
      `/data/io.cozy.konnectors/${encodeURIComponent(konnector._id)}/relationships/references`,
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

export function fetchResult (cozy, konnector) {
  return cozy.data.find(KONNECTORS_RESULT_DOCTYPE, konnector.slug)
}

export function findAll (cozy) {
  return findAllDocuments(cozy, KONNECTORS_DOCTYPE)
}

export function findAllResults (cozy) {
  return findAllDocuments(cozy, KONNECTORS_RESULT_DOCTYPE)
}

function findAllDocuments (cozy, doctype) {
  return cozy.fetchJSON('GET', `/data/${doctype}/_all_docs?include_docs=true`)
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

export function subscribeAll (cozy) {
  return realtime.subscribeAll(cozy, KONNECTORS_DOCTYPE)
}

export function subscribeAllResults (cozy) {
  return realtime.subscribeAll(cozy, KONNECTORS_RESULT_DOCTYPE)
}

export function install (cozy, konnector, timeout = 120000) {
  ['slug', 'source'].forEach(property => {
    if (!konnector[property]) throw new Error(`Missing '${property}' property in konnector`)
  })

  const { slug, source } = konnector

  return findBySlug(cozy, slug)
    .catch(error => {
      if (error.status !== '404') throw error
      return null
    })
    .then(konnector => konnector
      // Need JSONAPI format
      ? cozy.data.find(KONNECTORS_DOCTYPE, konnector._id)
        : cozy.fetchJSON('POST', `/konnectors/${slug}?Source=${encodeURIComponent(source)}`))
    .then(konnector => waitForKonnectorReady(cozy, konnector, timeout))
}

// monitor the status of the connector and resolve when the connector is ready
function waitForKonnectorReady (cozy, konnector, timeout) {
  return new Promise((resolve, reject) => {
    const idTimeout = setTimeout(() => {
      reject(new Error('Konnector installation timed out'))
    }, timeout)

    const idInterval = setInterval(() => {
      cozy.data.find(KONNECTORS_DOCTYPE, konnector._id)
        .then(konnectorResult => {
          if (konnectorResult.state === KONNECTOR_STATE.READY) {
            clearTimeout(idTimeout)
            clearInterval(idInterval)
            resolve(konnector)
          }
        })
        .catch(error => {
          clearTimeout(idTimeout)
          clearInterval(idInterval)
          reject(error)
        })
    }, 1000)
  })
}

function patchFolderPermission (cozy, konnector, folderId = null) {
  const slug = konnector.attributes ? konnector.attributes.slug : konnector.slug
  const saveFolder = folderId ? {type: 'io.cozy.files', values: [folderId]} : {}

  return cozy.fetchJSON('PATCH', `/permissions/konnectors/${encodeURIComponent(slug)}`, {
    data: {
      attributes: {
        permissions: {
          saveFolder: saveFolder
        }
      }
    }
  })
}

export function addFolderPermission (cozy, konnector, folderId) {
  return patchFolderPermission(cozy, konnector, folderId)
}

export function deleteFolderPermission (cozy, konnector) {
  return patchFolderPermission(cozy, konnector)
}

export function run (cozy, konnector, account, disableSuccessTimeout = false, successTimeout = 30 * 1000) {
  const slug = konnector.attributes ? konnector.attributes.slug : konnector.slug
  if (!slug) {
    throw new Error('Missing `slug` parameter for konnector')
  }
  if (!account._id) throw new Error('Missing `_id` parameter for account')
  if (!account.folderId) throw new Error('Missing `folderId` parameter for account')

  return cozy.jobs.create('konnector', {
    konnector: slug,
    account: account._id,
    folder_to_save: account.folderId
  }, {
    priority: 10,
    max_exec_count: 1
  })
  .then(job => waitForJobFinished(cozy, job, disableSuccessTimeout, successTimeout))
}

// monitor the status of the connector and resolve when the connector is ready
function waitForJobFinished (cozy, job, disableSuccessTimeout, successTimeout) {
  return new Promise((resolve, reject) => {
    jobs.subscribe(cozy, job)
      .then(subscription => {
        let idTimeout

        if (!disableSuccessTimeout) {
          idTimeout = setTimeout(() => {
            resolve(job)
            subscription.unsubscribe()
          }, successTimeout)
        }

        subscription.onUpdate(job => {
          if (job.state === JOB_STATE.ERRORED) {
            clearTimeout(idTimeout)
            subscription.unsubscribe()
            reject(new Error(job.error))
          }

          if (job.state === JOB_STATE.DONE) {
            clearTimeout(idTimeout)
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
