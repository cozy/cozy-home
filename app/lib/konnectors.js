/* konnector lib ready to be added to cozy-client-js */
const KONNECTORS_DOCTYPE = 'io.cozy.konnectors'

const STATE_READY = 'ready'

export function addAccount (cozy, konnector, account) {
  if (!konnector.accounts) konnector.accounts = []
  konnector.accounts.push(account)
  return Promise.resolve(konnector)
}

export function fetchManifest (cozy, source) {
  return cozy.fetchJSON('GET', `/konnectors/manifests?Source=${encodeURIComponent(source)}`)
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

export function install (cozy, slug, source, timeout = 120000) {
  if (!slug) throw new Error('Missing `slug` paramater for konnector')
  if (!source) throw new Error('Missing `source` parameter for konnector')

  return cozy.fetchJSON('POST', `/konnectors/${slug}?Source=${encodeURIComponent(source)}`)
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
          if (konnectorResult.state === STATE_READY) {
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

export function run (cozy, slug, accountId, folderId, timeout = 120 * 1000) {
  if (!slug) throw new Error('Missing `slug` parameter for konnector')
  if (!accountId) throw new Error('Missing `accountId` parameter for konnector')
  if (!folderId) throw new Error('Missing `folderId` parameter for konnector')

  return findBySlug(cozy, slug)
  .then(konnector => {
    return cozy.fetchJSON('POST', '/jobs/queue/konnector', {
      data: {
        attributes: {
          options: {
            priority: 10,
            timeout,
            max_exec_count: 1
          }
        },
        arguments: {
          konnector: konnector._id,
          account: accountId,
          folderToSave: folderId
        }
      }
    })
  })
  // .then(job => waitForJobFinished(cozy, job, timeout))
}

// monitor the status of the connector and resolve when the connector is ready
function waitForJobFinished (cozy, job, timeout) {
  return new Promise((resolve, reject) => {
    const idTimeout = setTimeout(() => {
      reject(new Error('Job timed out'))
    }, timeout)

    const idInterval = setInterval(() => {
      cozy.data.find(job._type, job._id)
        .then(job => {
          if (job.state === STATE_READY) {
            clearTimeout(idTimeout)
            clearInterval(idInterval)
            resolve(job)
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
