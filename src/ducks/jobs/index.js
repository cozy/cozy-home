import DateFns from 'date-fns'
const DOCTYPE = 'io.cozy.jobs'

// CRUD

export const fetchKonnectorJobs = () => {}

// selectors

export const getTriggerLastJob = (state, trigger) => {
  // state is state.cozy
  if (!state.documents || !state.documents[DOCTYPE] || !trigger) return null
  return Object.values(
    state.documents[DOCTYPE]
  ).reduce((lastestJob, currentJob) => {
    if (currentJob.trigger_id !== trigger._id) return lastestJob
    if (!lastestJob) return currentJob
    return DateFns.isAfter(currentJob.started_at, lastestJob.started_at)
      ? currentJob
      : lastestJob
  }, null)
}

export const isJobRunning = (state, job) =>
  !!job && ['queued', 'running'].includes(job.state)
