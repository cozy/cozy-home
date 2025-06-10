import { useEffect, useRef } from 'react'
import { useQuery } from 'cozy-client'
import {
  makeAccountsQuery,
  makeAppsQuery,
  makeKonnectorsQuery,
  makeTriggersQuery
} from '@/queries'
import log from 'cozy-logger'

export const useFetchInitialData = () => {
  const accountsQuery = useQuery(
    makeAccountsQuery.definition,
    makeAccountsQuery.options
  )
  const konnectorsQuery = useQuery(
    makeKonnectorsQuery.definition,
    makeKonnectorsQuery.options
  )
  const appsQuery = useQuery(makeAppsQuery.definition, makeAppsQuery.options)
  const triggersQuery = useQuery(
    makeTriggersQuery.definition,
    makeTriggersQuery.options
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const allQueries = [accountsQuery, konnectorsQuery, appsQuery, triggersQuery]

  const startTime = useRef(null)
  const loggedTime = useRef(false)

  useEffect(() => {
    if (startTime.current === null) {
      startTime.current = performance.now()
    }

    const allFetched = allQueries.every(query => query.fetchStatus === 'loaded')

    if (allFetched && !loggedTime.current) {
      const endTime = performance.now()
      log('info', `Required data fetched in ${endTime - startTime.current} ms`)
      loggedTime.current = true
    }
  }, [allQueries])

  const isFetching = allQueries.some(
    query => query.fetchStatus === 'loading' || query.fetchStatus === 'pending'
  )
  const hasError = allQueries.some(query => query.fetchStatus === 'failed')

  return {
    isFetching,
    hasError,
    data: {
      accounts: accountsQuery.data,
      konnectors: konnectorsQuery.data,
      apps: appsQuery.data,
      triggers: triggersQuery.data
    }
  }
}
