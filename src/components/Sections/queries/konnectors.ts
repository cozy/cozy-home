import memoize from 'lodash/memoize'

import CozyClient, { Q } from 'cozy-client'

import { IOCozyKonnector } from 'cozy-client/types/types'
import { KonnectorFromRegistry } from '@/components/Sections/SectionsTypes'

// Define the grouping function
const groupByCategory = (
  data: KonnectorFromRegistry[]
): { [key: string]: IOCozyKonnector[] } => {
  const grouped: { [key: string]: IOCozyKonnector[] } = {}

  data.forEach(item => {
    if (
      item.latest_version &&
      item.latest_version.manifest &&
      item.latest_version.manifest.categories
    ) {
      item.latest_version.manifest.categories.forEach((category: string) => {
        if (!grouped[category]) {
          grouped[category] = []
        }
        grouped[category].push(item.latest_version.manifest)
      })
    }
  })

  return grouped
}

// Memoize the grouping function
const memoizedGroupByCategory = memoize(groupByCategory)

export const fetchAllKonnectors = async (
  client: CozyClient,
  channel = 'stable'
): Promise<{ [key: string]: IOCozyKonnector[] }> => {
  const { data } = (await client.query(
    Q('io.cozy.apps_registry').getById(`konnectors/${channel}`)
  )) as { data: KonnectorFromRegistry[] }

  return memoizedGroupByCategory(data)
}
