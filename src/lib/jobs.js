/* jobs lib ready to be added to cozy-client-js */
import * as realtime from './realtime'

export const JOBS_DOCTYPE = 'io.cozy.jobs'

export const JOB_STATE = {
  RUNNING: 'running'
}

function decode (job) {
  return { ...job, ...JSON.parse(window.atob(job.message.Data)) }
}

export function findById (cozy, id) {
  return cozy.fetchJSON('GET', `/jobs/${id}`)
}

export function find (cozy, query) {
  return cozy.data.defineIndex(JOBS_DOCTYPE, Object.keys(query))
    // TODO: cache the index
    .then(index => cozy.data.query(index, {
      selector: query
    })
    .then(jobs => {
      return jobs.map(decode)
    })
  )
}

export function subscribe (cozy, job) {
  return realtime.subscribe(cozy, JOBS_DOCTYPE, job, decode)
}

export function subscribeAll (cozy) {
  return realtime.subscribeAll(cozy, JOBS_DOCTYPE, decode)
}
