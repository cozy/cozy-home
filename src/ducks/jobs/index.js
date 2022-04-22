// CRUD

export const fetchKonnectorJobs = () => {}

// selectors

export const isJobRunning = (state, job) =>
  !!job && ['queued', 'running'].includes(job.state)
