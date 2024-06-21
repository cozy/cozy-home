import memoize from 'lodash/memoize'

import CozyClient from 'cozy-client'

import { IOCozyKonnector } from 'cozy-client/types/types'
import { KonnectorFromRegistry } from 'components/Sections/SectionsTypes'

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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const { data } = (await client.stackClient.fetchJSON(
    'GET',
    `/registry?versionsChannel=${channel}&filter[type]=konnector&limit=300`
  )) as { data: KonnectorFromRegistry[] }

  return memoizedGroupByCategory(data)
}
