import { useEffect } from 'react'
import {
  makeTriggersWithJobStatusQuery,
  makeAppsQuery,
  makeJobsQuery
} from '@/queries'
import { useClient } from 'cozy-client'

const ReloadFocus = () => {
  const client = useClient()

  useEffect(() => {
    const handleFocus = () => {
      // FIXME: do not use query options here, because of https://github.com/cozy/cozy-client/issues/931
      // Especially for the apps query, the fetchPolicy is always applied here, because it is called
      // elsewhere, making the query's lastUpdate very close in time.
      // And because of this, the home is rendered after each focus, as the same query gives different
      // result (a complete response, vs an early empty return in this case)
      client.query(makeJobsQuery.definition())
      client.query(makeTriggersWithJobStatusQuery.definition())
      client.query(makeAppsQuery.definition())
    }

    window.addEventListener('focus', handleFocus)
    return () => {
      window.removeEventListener('focus', handleFocus)
    }
  }, [client])

  return null
}

export default ReloadFocus
