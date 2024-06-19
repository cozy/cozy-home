import memoize from 'lodash/memoize'
import CozyClient from 'cozy-client'

interface Konnector {
  latest_version: {
    manifest: {
      categories: string[]
    }
  }
}

interface GroupedKonnectors {
  [category: string]: Konnector[]
}

// Define the grouping function
const groupByCategory = (data: Konnector[]): GroupedKonnectors => {
  const grouped: GroupedKonnectors = {}

  data.forEach((item: Konnector) => {
    if (
      item.latest_version &&
      item.latest_version.manifest &&
      item.latest_version.manifest.categories
    ) {
      item.latest_version.manifest.categories.forEach((category: string) => {
        if (!grouped[category]) {
          grouped[category] = []
        }
        grouped[category].push(item)
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
): Promise<GroupedKonnectors> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const { data } = (await client.stackClient.fetchJSON(
    'GET',
    `/registry?versionsChannel=${channel}&filter[type]=konnector&limit=300`
  )) as { data: Konnector[] }

  return memoizedGroupByCategory(data)
}
