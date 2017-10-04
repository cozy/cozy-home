/* jobs lib ready to be added to cozy-client-js */
import DateFns from 'date-fns'
import * as realtime from './realtime'

export const JOBS_DOCTYPE = 'io.cozy.jobs'

export const JOB_STATE = {
  QUEUED: 'queued',
  DONE: 'done',
  ERRORED: 'errored',
  RUNNING: 'running'
}

function decode (job) {
  // Retrieve message properties directly into job
  return { ...job, ...job.message }
}

export function findById (cozy, id) {
  return cozy.fetchJSON('GET', `/jobs/${id}`)
}

export function findQueuedOrRunning (cozy, limitDate) {
  return cozy.fetchJSON('GET', '/jobs/queue/konnector')
    .then(results => {
      return results.map(result => decode(result.attributes))
    })
    .then(jobs => limitDate ? jobs.filter(job => DateFns.isAfter(job.queued_at, limitDate)) : jobs)
}

export function subscribe (cozy, job) {
  return realtime.subscribe(cozy, JOBS_DOCTYPE, job, decode)
}

export function subscribeAll (cozy) {
  return realtime.subscribeAll(cozy, JOBS_DOCTYPE, decode)
}
