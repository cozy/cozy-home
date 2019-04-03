/* jobs lib ready to be added to cozy-client-js */
import * as realtime from 'lib/realtime'

const JOBS_DOCTYPE = 'io.cozy.jobs'

function decode(job) {
  // Retrieve message properties directly into job
  return { ...job, ...job.message }
}

export function subscribe(cozy, job) {
  return realtime.subscribe(cozy, JOBS_DOCTYPE, job, decode)
}

export function subscribeAll(cozy) {
  return realtime.subscribeAll(cozy, JOBS_DOCTYPE, decode)
}
