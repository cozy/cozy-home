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
      .then(konnector => new Promise((resolve, reject) => {
        const idTimeout = setTimeout(() => {
          reject(new Error('Konnector installation timed out'))
        }, timeout)

        // monitor the status of the connector
        // TODO: replace by a polling abstraction utility.
        const idInterval = setInterval(() => {
          cozy.data.find(KONNECTORS_DOCTYPE, konnector._id)
            .then(konnector => {
              if (konnector.state === STATE_READY) {
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
      }))
}
