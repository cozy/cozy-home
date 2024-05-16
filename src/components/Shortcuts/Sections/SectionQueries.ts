import CozyClient, { Q, QueryDefinition } from 'cozy-client'

export const defaultFetchPolicy = CozyClient.fetchPolicies.olderThan(30 * 1000)

export const fetchSectionItems = (
  id: string
): {
  query: QueryDefinition
  as: string
  // eslint-disable-next-line @typescript-eslint/ban-types
  fetchPolicy: Function
} => ({
  query: Q(id),
  as: id,
  fetchPolicy: defaultFetchPolicy as (timestamp: number) => boolean
})
