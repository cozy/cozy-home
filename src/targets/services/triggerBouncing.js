const cozyFetch = require('../../lib/services/cozyFetch')

const LOGIN_FAILED_ERROR = 'LOGIN_FAILED'
const USER_ACTION_NEEDED_ERROR = 'USER_ACTION_NEEDED'

// for timestamp usage
const ONE_HOUR = 3600 * 1000
const ONE_DAY = 24 * ONE_HOUR

cozyFetch('GET', '/data/io.cozy.jobs/_all_docs?include_docs=true', null, true)
  .then(jobs => {
    const konnectorJobs = jobs.filter(job => job.worker === 'konnector')
    // sort by finished_at date
    jobs.sort((a, b) => {
      a = new Date(a.finished_at)
      b = new Date(b.finished_at)
      return a > b ? -1 : a < b ? 1 : 0
    })

    // get jobs sorted by trigger ID
    let triggersMap = new Map()
    for (const job of konnectorJobs) {
      if (!job.trigger_id) continue
      const jobsArray = triggersMap.get(job.trigger_id) || []
      jobsArray.push(job)
      triggersMap.set(job.trigger_id, jobsArray)
    }

    triggersMap.forEach((jobs, triggerId) => {
      // shouldn't have empty jobs array at this point
      let erroredJobsCounter = 0
      for (const job of jobs) {
        // not an errored job, reset the counter
        if (!job.error || job.state !== 'errored') {
          erroredJobsCounter = 0
          continue
        }
        switch (job.error) {
          // errors exceptions
          case LOGIN_FAILED_ERROR:
          case USER_ACTION_NEEDED_ERROR:
            erroredJobsCounter = 0
            break
          default:
            erroredJobsCounter++
        }
      }

      // don't relaunch if no errors or too many errors
      if (erroredJobsCounter === 0 || erroredJobsCounter > 2) return

      const lastJob = jobs[jobs.length - 1]
      const currentTimestamp = new Date().getTime()
      const lastFinishedTimestamp = new Date(lastJob.finished_at).getTime()
      const timestampDifference = currentTimestamp - lastFinishedTimestamp
      if (erroredJobsCounter === 1 && timestampDifference > ONE_HOUR) {
        // one last error found -> relaunch after one hour
        cozyFetch('POST', `/jobs/triggers/${triggerId}/launch`, null, true, {
          Accept: 'application/vnd.api+json'
        })
          .then(res => {
            console.log(`Trigger ${res.data.id} relaunched (1st time).`)
          })
          .catch(err => {
            console.log(`Relaunching failed. ${err}`)
          })
      } else if (erroredJobsCounter === 2 && timestampDifference > ONE_DAY) {
        // two last error founds -> relaunch after one day
        cozyFetch('POST', `/jobs/triggers/${triggerId}/launch`, null, true, {
          Accept: 'application/vnd.api+json'
        })
          .then(res => {
            console.log(`Trigger ${res.data.id} relaunched (2th time).`)
          })
          .catch(err => {
            console.log(`Relaunching failed. ${err}`)
          })
      }
    })
  })
  .catch(error => {
    // the _all_docs endpoint returns a 404 error if no document with the given
    // doctype exists.
    if (error.status === 404) return []
    throw error
  })
