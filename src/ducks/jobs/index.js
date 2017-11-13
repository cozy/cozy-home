import DateFns from 'date-fns'
import { fetchTriggerJobs } from 'redux-cozy-client'
const DOCTYPE = 'io.cozy.jobs'

// CRUD

export const fetchKonnectorJobs = () => fetchTriggerJobs('jobs', 'konnector')

// selectors

export const getTriggerLastJob = (state, trigger) => {
  // state is state.cozy
  if (!state.documents || !state.documents[DOCTYPE]) return null
  return Object.values(
    state.documents[DOCTYPE]
  ).reduce((lastestJob, currentJob) => {
    if (currentJob.trigger_id !== trigger._id) return lastestJob
    if (!lastestJob) return currentJob
    console.log(currentJob.started_at, lastestJob.started_at)
    console.log(DateFns.isAfter(currentJob.started_at, lastestJob.started_at))
    return DateFns.isAfter(currentJob.started_at, lastestJob.started_at)
      ? currentJob
      : lastestJob
  }, null)
}
