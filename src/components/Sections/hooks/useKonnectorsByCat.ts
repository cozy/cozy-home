import { sortBy } from 'lodash'
import { useState, useEffect, useMemo, useCallback } from 'react'

import type {
  IOCozyAccount,
  IOCozyApp,
  IOCozyKonnector,
  IOCozyTrigger
} from 'cozy-client/types/types'
import {
  useClient,
  useQuery,
  useAppsInMaintenance,
  QueryDefinition
} from 'cozy-client'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import { Section } from 'components/Sections/SectionsTypes'
import { fetchAllKonnectors } from 'components/Sections/queries/konnectors'
import {
  makeAccountsQuery,
  konnectorsConn,
  suggestedKonnectorsConn,
  makeTriggersQuery
} from 'queries'
import { formatServicesSections } from 'components/Sections/lib/formatServicesSections'

const _makeTriggersQuery = makeTriggersQuery as {
  definition: () => QueryDefinition
  options: Record<string, unknown>
}

const _makeAccountsQuery = makeAccountsQuery as {
  definition: () => QueryDefinition
  options: Record<string, unknown>
}

export const useKonnectorsByCat = (): Section[] => {
  const client = useClient()
  const { t } = useI18n()

  const { data: allTriggers } = useQuery(
    _makeTriggersQuery.definition(),
    _makeTriggersQuery.options
  ) as {
    data: IOCozyTrigger[]
  }
  const { data: accounts } = useQuery(
    _makeAccountsQuery.definition(),
    _makeAccountsQuery.options
  ) as {
    data: IOCozyAccount[]
  }

  const { data: konnectors } = useQuery(
    konnectorsConn.query,
    konnectorsConn
  ) as {
    data: IOCozyKonnector[]
  }

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
