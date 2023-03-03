/*
 * This service stops the given job with a 'context deadline exceeded' error. It may be called when
 * the execution of the clisk konnector is too long or when the flagship app has crashed.
 * The flagship app will also timeout the job if it restarts but this way, the user will not see
 * the job as running even outside the flagship app
 *
 * This service is supposed to be called directly or via a @in or @at trigger
 *
 * Example to call this service :
 *
 *
 *  await client.collection('io.cozy.jobs').create(
 *     'service',
 *     {
 *       name: 'cliskTimeout',
 *       slug: 'home',
 *       fields: {
 *        cliskJobId: '<the job id>'
 *       } }
 *   )
 */
import CozyClient, { Q } from 'cozy-client'
import logger from 'cozy-logger'
import polyfillFetch from './polyfillFetch'

const log = logger.namespace('cliskTimeout')

polyfillFetch()

const TIMEOUT_ERROR = 'context deadline exceeded' // same error as cozy-stack when interrupting a job for timeout
const JOBS_DOCTYPE = 'io.cozy.jobs'

const main = async () => {
  const client = CozyClient.fromEnv()

  const { cliskJobId } = getServiceFields()

  if (!cliskJobId) {
    throw new Error('No cliskJobId field defined. Could find any job to update')
  }

  const { data: job } = await client.query(
    Q('io.cozy.jobs').getById(cliskJobId)
  )

  if (job) {
    await client.save({
      _id: cliskJobId,
      _rev: job._rev,
      worker: 'client',
      _type: JOBS_DOCTYPE,
      attributes: {
        state: 'errored',
        error: TIMEOUT_ERROR
      }
    })
  } else {
    throw new Error(`Could not find the job ${cliskJobId}`)
  }
}
;(async () => {
  try {
    await main()
  } catch (error) {
    log('critical', error.message)
  }
})()

function getServiceFields() {
  return JSON.parse(process.env.COZY_FIELDS || '{}')
}
