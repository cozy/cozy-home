import { sortBy } from 'lodash'
import { useSelector } from 'react-redux'
import { useState, useEffect, useMemo, useCallback } from 'react'

import type {
  IOCozyAccount,
  IOCozyApp,
  IOCozyKonnector,
  IOCozyTrigger
} from 'cozy-client/types/types'
import { useClient, useQuery, useAppsInMaintenance } from 'cozy-client'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import { Section } from 'components/Sections/SectionsTypes'
import { fetchAllKonnectors } from 'components/Sections/queries/konnectors'
import { getInstalledKonnectors } from 'selectors/konnectors'
import { suggestedKonnectorsConn } from 'queries'
import { formatServicesSections } from 'components/Sections/services/formatServicesSections'

export const useKonnectorsByCat = (): Section[] => {
  const client = useClient()
  const { t } = useI18n()

  // Unsure how to handle the deps issues, useSelector should already be memoized
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const allTriggers =
    useSelector(
      (state: {
        cozy: { documents: Record<string, Record<string, IOCozyTrigger>> }
      }) => state.cozy.documents['io.cozy.triggers']
    ) || {}

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const accounts =
    useSelector(
      (state: {
        cozy: { documents: Record<string, Record<string, IOCozyAccount>> }
      }) => state.cozy.documents['io.cozy.accounts']
    ) || {}

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const konnectors: IOCozyKonnector[] =
    useSelector(
      getInstalledKonnectors as (
        state: Record<string, unknown>
      ) => IOCozyKonnector[]
    ) || []

  const appsAndKonnectorsInMaintenance = (
    useAppsInMaintenance as unknown as () => IOCozyApp[]
  )()

  const installedKonnectors = useMemo(
    () => sortBy(konnectors, konnector => konnector.name.toLowerCase()),
    [konnectors]
  )

  const suggestedKonnectorsQuery = useQuery(
    suggestedKonnectorsConn.query,
    suggestedKonnectorsConn
  ) as { data: IOCozyKonnector[] }

  const candidatesSlugBlacklist = useMemo(
    () =>
      appsAndKonnectorsInMaintenance
        .map(({ slug }) => slug)
        .concat(installedKonnectors.map(({ slug }) => slug)),
    [appsAndKonnectorsInMaintenance, installedKonnectors]
  )

  const suggestedKonnectors = useMemo(() => {
    return suggestedKonnectorsQuery.data
      ? suggestedKonnectorsQuery.data.filter(
          ({ slug }) => !candidatesSlugBlacklist.includes(slug)
        )
      : []
  }, [suggestedKonnectorsQuery.data, candidatesSlugBlacklist])

  const [groupedData, setGroupedData] =
    useState<{ [key: string]: IOCozyKonnector[] }>()

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      if (!client) return
      const grouped = await fetchAllKonnectors(client)
      setGroupedData(grouped)
    }
    void fetchData()
  }, [client])

  const sortedData = useCallback(
    (): Section[] =>
      groupedData
        ? formatServicesSections(
            groupedData,
            installedKonnectors,
            suggestedKonnectors,
            appsAndKonnectorsInMaintenance,
            t,
            allTriggers,
            accounts
          )
        : [],
    [
      groupedData,
      installedKonnectors,
      suggestedKonnectors,
      appsAndKonnectorsInMaintenance,
      t,
      allTriggers,
      accounts
    ]
  )

  return sortedData()
}
