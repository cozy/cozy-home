import CozyClient, { Q } from 'cozy-client'

const defaultFetchPolicy = CozyClient.fetchPolicies.olderThan(30 * 1000)
export const appsConn = {
  query: Q('io.cozy.apps'),
  as: 'apps',
  fetchPolicy: defaultFetchPolicy
}

export const suggestedKonnectorsConn = {
  query: () =>
    Q('io.cozy.apps.suggestions')
      .where({ silenced: false })
      .sortBy([{ silenced: 'asc' }, { slug: 'asc' }])
      .indexFields(['silenced', 'slug']),
  as: 'app-suggestions',
  fetchPolicy: defaultFetchPolicy
}
