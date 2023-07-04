import { Q, QueryDefinition } from 'cozy-client'
import { QueryState } from 'cozy-client/types/types'

/**
 * @description Fetches the list of running jobs for konnectors.
 * The select command only works during the first request.
 * Realtime requests will receive the whole Job object.
 * So in any case we have to map the fetched data before giving it to the view.
 *
 * @example
 * const { data: runningKonnectors } = useQuery(
 *  fetchRunningKonnectors.definition,
 * fetchRunningKonnectors.options
 * )
 */
export const fetchRunningKonnectors = {
  definition: (): QueryDefinition =>
    Q('io.cozy.jobs')
      .select(['message.konnector', 'worker', 'state'])
      .indexFields(['started_at'])
      .sortBy([{ started_at: 'desc' }])
      .partialIndex({
        worker: { $or: ['konnector', 'client'] },
        state: 'running'
      }),

  options: {
    as: 'io.cozy.jobs/running/konnector/messageKonnector'
  }
}

/**
 * @description Returns the list of running konnectors from the list of jobs as
 * an array of strings (the konnector slugs) or an empty array if <br />
 * the list of running jobs is empty.
 *
 * @example
 * const { data } = useQuery(
    fetchRunningKonnectors.definition,
    fetchRunningKonnectors.options
  )
 * const runningKonnectors = getRunningKonnectors(data)
 */
export const getRunningKonnectors = (jobData: QueryState['data']): string[] => {
  try {
    if (Array.isArray(jobData) && jobData.length > 0) {
      return (jobData as { message: { konnector: string } }[]).map(
        job => job.message.konnector
      )
    } else return []
  } catch {
    return []
  }
}
