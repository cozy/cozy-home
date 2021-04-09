import CozyClient, { Q } from 'cozy-client'

export const appsConn = {
  query: Q('io.cozy.apps'),
  as: 'apps',
  fetchPolicy: CozyClient.fetchPolicies.olderThan(30 * 1000)
}
