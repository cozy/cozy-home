import { sortBy } from 'lodash'
import { useSelector } from 'react-redux'
import { useState, useEffect, useMemo } from 'react'

import type { IOCozyApp, IOCozyKonnector } from 'cozy-client/types/types'
import { useClient, useQuery, useAppsInMaintenance } from 'cozy-client'

import { Section } from 'components/Sections/SectionsTypes'
import { fetchAllKonnectors } from 'components/Sections/queries/konnectors'
import { getInstalledKonnectors } from 'selectors/konnectors'
import { suggestedKonnectorsConn } from 'queries'

const transformAndSortData = (
  data: { [key: string]: IOCozyKonnector[] },
  installedKonnectors: IOCozyKonnector[],
  suggestedKonnectors: IOCozyKonnector[],
  appsAndKonnectorsInMaintenance: IOCozyKonnector[]
): Section[] => {
  const installedKonnectorNames = new Set(installedKonnectors.map(k => k.name))
  const maintenanceSlugs = new Set(
    appsAndKonnectorsInMaintenance.map(k => k.slug)
  )

  const sections = Object.keys(data).map(key => {
    const allItems = data[key] || []
    const availableItems = allItems.filter(
      item => !maintenanceSlugs.has(item.slug)
    )
    const installedItems = availableItems.filter(item =>
      installedKonnectorNames.has(item.name)
    )
    const suggestedItems = availableItems.filter(item =>
      suggestedKonnectors.some(k => k.slug === item.slug)
    )
    const items =
      installedItems.length > 0
        ? [...installedItems, ...suggestedItems]
        : availableItems

    return {
      name: key,
      items,
      id: key,
      type: 'category',
      layout: {
        originalName: key,
        createdByApp: '',
        mobile: { detailedLines: false, grouped: true },
        desktop: { detailedLines: false, grouped: true },
        order: 0
      },
      pristine: installedItems.length === 0
    }
  })

  sections.sort((a, b) => {
    if (!a.pristine && b.pristine) {
      return -1
    }
    if (a.pristine && !b.pristine) {
      return 1
    }
    return a.name.localeCompare(b.name)
  })

  return sections
}

export const useKonnectorsByCat = (): Section[] => {
  const client = useClient()
  const [groupedData, setGroupedData] =
    useState<{ [key: string]: IOCozyKonnector[] }>()
  const konnectors: IOCozyKonnector[] =
    useSelector(
      getInstalledKonnectors as (
        state: Record<string, unknown>
      ) => IOCozyKonnector[]
    ) || []

  const appsAndKonnectorsInMaintenance = (
    useAppsInMaintenance as unknown as () => IOCozyApp[]
  )()

  const installedKonnectors = sortBy(konnectors, konnector =>
    konnector.name.toLowerCase()
  )

  const suggestedKonnectorsQuery = useQuery(
    suggestedKonnectorsConn.query,
    suggestedKonnectorsConn
  ) as {
    data: IOCozyKonnector[]
  }

  const candidatesSlugBlacklist = appsAndKonnectorsInMaintenance
    .map(({ slug }) => slug)
    .concat(installedKonnectors.map(({ slug }) => slug))

  const suggestedKonnectors = useMemo(() => {
    return suggestedKonnectorsQuery.data
      ? suggestedKonnectorsQuery.data.filter(
          ({ slug }) => !candidatesSlugBlacklist.includes(slug)
        )
      : []
  }, [suggestedKonnectorsQuery.data, candidatesSlugBlacklist])

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      if (!client) return
      const grouped = await fetchAllKonnectors(client)
      setGroupedData(grouped)
    }

    void fetchData()
  }, [client])

  const sortedData = useMemo(
    () =>
      groupedData
        ? transformAndSortData(
            groupedData,
            installedKonnectors,
            suggestedKonnectors,
            appsAndKonnectorsInMaintenance
          )
        : [],
    [
      appsAndKonnectorsInMaintenance,
      groupedData,
      installedKonnectors,
      suggestedKonnectors
    ]
  )

  return sortedData
}
