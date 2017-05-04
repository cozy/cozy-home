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

export function install (cozy, konnector, timeout = 120000) {
  ['slug', 'source'].forEach(property => {
    if (!konnector[property]) throw new Error(`Missing '${property}' property in konnector`)
  })

  const { _id, slug, source } = konnector

  return (_id
    ? cozy.data.find(KONNECTORS_DOCTYPE, _id)
      .catch(error => {
        console.debug('install error')
        if (error.status !== '404') throw error
        return null
      })
      : Promise.resolve(null))
    .then(konnector => konnector || cozy.fetchJSON('POST', `/konnectors/${slug}?Source=${encodeURIComponent(source)}`))
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

export function run (cozy, konnector, account, timeout = 120 * 1000) {
  if (!konnector.attributes || !konnector.attributes.slug) {
    throw new Error('Missing `attributes.slug` parameter for konnector')
  }
  if (!account._id) throw new Error('Missing `_id` parameter for account')
  if (!account.folderId) throw new Error('Missing `folderId` parameter for account')

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
        account: account._id,
        folderToSave: account.folderId
      }
    }
  })
  .then(job => waitForJobFinished(cozy, job, timeout))
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
