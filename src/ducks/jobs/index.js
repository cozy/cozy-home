import { fetchTriggerJobs } from 'redux-cozy-client'

// CRUD

export const fetchKonnectorJobs = () => fetchTriggerJobs('jobs', 'konnector')
