import { useClient, useQuery, useAppsInMaintenance } from 'cozy-client'
import { useState, useEffect, useMemo } from 'react'
import { fetchAllKonnectors } from 'components/Sections/queries/konnectors'
import { Section } from 'components/Sections/SectionsTypes'
import { sortBy } from 'lodash'
import { useSelector } from 'react-redux'
import { getInstalledKonnectors } from '../../../selectors/konnectors'
import { suggestedKonnectorsConn } from 'queries'
import { suggest } from 'cozy-minilog'

interface KonnectorData {
  [key: string]: any[]
}

interface InstalledKonnector {
  name: string
  categories: string[]
}
interface SuggestedKonnector {
  id: string
  slug: string
  // Add other relevant properties
}
const transformAndSortData = (
  data: KonnectorData,
  installedKonnectors: InstalledKonnector[],
  suggestedKonnectors: SuggestedKonnector[]
): Section[] => {
  const installedKonnectorNames = new Set(installedKonnectors.map(k => k.name))

  return Object.keys(data)
    .map(key => {
      const allItems = data[key] || []
      const installedItems = allItems.filter(item =>
        installedKonnectorNames.has(item.latest_version.manifest.name)
      )
      const suggestedItems = allItems.filter(item =>
        suggestedKonnectors.find(
          k => k.slug === item.latest_version.manifest.slug
        )
      )

      const items =
        installedItems.length > 0
          ? [...installedItems, ...suggestedItems]
          : allItems

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
    .sort((a, b) => a.name.localeCompare(b.name))
}
export const useKonnectorsByCat = (): Section[] => {
  const client = useClient()
  const [groupedData, setGroupedData] = useState<KonnectorData>({})
  const konnectors = useSelector(getInstalledKonnectors) || []
  const appsAndKonnectorsInMaintenance = useAppsInMaintenance()

  const installedKonnectors = sortBy(konnectors, konnector =>
    konnector.name.toLowerCase()
  )

  const suggestedKonnectorsQuery = useQuery(
    suggestedKonnectorsConn.query,
    suggestedKonnectorsConn
  )

  const candidatesSlugBlacklist = appsAndKonnectorsInMaintenance
    .map(({ slug }) => slug)
    .concat(installedKonnectors.map(({ slug }) => slug))

  const suggestedKonnectors = suggestedKonnectorsQuery.data
    ? suggestedKonnectorsQuery.data.filter(
        ({ slug }) => !candidatesSlugBlacklist.includes(slug)
      )
    : []

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
      transformAndSortData(
        groupedData,
        installedKonnectors,
        suggestedKonnectors
      ),
    [groupedData, installedKonnectors, suggestedKonnectors]
  )

  return sortedData
}
