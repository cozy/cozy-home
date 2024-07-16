import { sortBy } from 'lodash'
import { useSelector } from 'react-redux'
import { useState, useEffect, useMemo } from 'react'

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
import {
  getAccountsFromTrigger,
  getTriggersBySlug,
  STATUS
} from 'components/KonnectorTile'

const transformAndSortData = (
  data: { [key: string]: (IOCozyKonnector & { status?: string })[] },
  installedKonnectors: IOCozyKonnector[],
  suggestedKonnectors: IOCozyKonnector[],
  appsAndKonnectorsInMaintenance: IOCozyKonnector[],
  t: (key: string) => string,
  allTriggers: Record<string, IOCozyTrigger>,
  accounts: { [key: string]: IOCozyAccount }
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
    const itemsToSort =
      installedItems.length > 0
        ? [...installedItems, ...suggestedItems]
        : availableItems

    return {
      name: key,
      items: itemsToSort
        .map(item => {
          const triggers = getTriggersBySlug(
            allTriggers as { trigger: IOCozyTrigger },
            item.slug
          )
          const accountsForKonnector = getAccountsFromTrigger(
            accounts as unknown as IOCozyAccount[],
            triggers
          )

          const itemToReturn = {
            ...item,
            status:
              (accountsForKonnector && accountsForKonnector.length > 0
                ? STATUS.OK
                : STATUS.NO_ACCOUNT) ?? STATUS.NO_ACCOUNT
          }

          return itemToReturn
        })
        .sort((a, b) => {
          if (a.status === STATUS.OK && b.status !== STATUS.OK) {
            return -1
          }
          if (a.status !== STATUS.OK && b.status === STATUS.OK) {
            return 1
          }

          if (
            a.status === STATUS.NO_ACCOUNT &&
            b.status !== STATUS.NO_ACCOUNT
          ) {
            return -1
          }
          if (
            a.status !== STATUS.NO_ACCOUNT &&
            b.status === STATUS.NO_ACCOUNT
          ) {
            return 1
          }
          return a.name.localeCompare(b.name)
        }),
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

    return t(`category.${a.name}`).localeCompare(t(`category.${b.name}`))
  })

  return sections
}

export const useKonnectorsByCat = (): Section[] => {
  const allTriggers =
    useSelector(
      (state: {
        cozy: {
          documents: Record<string, Record<string, IOCozyTrigger>>
        }
      }) => state.cozy.documents['io.cozy.triggers']
    ) || {}
  const accounts =
    useSelector(
      (state: {
        cozy: {
          documents: Record<string, Record<string, IOCozyAccount>>
        }
      }) => state.cozy.documents['io.cozy.accounts']
    ) || {}
  const client = useClient()
  const [groupedData, setGroupedData] =
    useState<{ [key: string]: IOCozyKonnector[] }>()
  const konnectors: IOCozyKonnector[] =
    useSelector(
      getInstalledKonnectors as (
        state: Record<string, unknown>
      ) => IOCozyKonnector[]
    ) || []
  const { t } = useI18n()
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

  const sortedData = (): Section[] =>
    groupedData
      ? transformAndSortData(
          groupedData,
          installedKonnectors,
          suggestedKonnectors,
          appsAndKonnectorsInMaintenance,
          t,
          allTriggers,
          accounts
        )
      : []

  return sortedData()
}
