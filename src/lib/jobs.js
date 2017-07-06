/* jobs lib ready to be added to cozy-client-js */
export const JOBS_DOCTYPE = 'io.cozy.jobs'

export const JOB_STATE = {
  RUNNING: 'running'
}

function decode (job) {
  return { ...job, ...JSON.parse(window.atob(job.message.Data)) }
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
