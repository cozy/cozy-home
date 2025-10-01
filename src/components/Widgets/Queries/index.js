import CozyClient, { Q } from 'cozy-client'

const DEFAULT_CACHE_TIMEOUT_QUERIES = 9 * 60 * 1000 // 10 minutes
const defaultFetchPolicy = CozyClient.fetchPolicies.olderThan(
  DEFAULT_CACHE_TIMEOUT_QUERIES
)

export const buildGradesQuery = (sourceAccountIdentifier, period) => ({
  definition: () =>
    Q('io.cozy.timeseries.grades')
      .where({
        title: period || { $gt: null },
        cozyMetadata: {
          sourceAccountIdentifier
        }
      })
      .indexFields(['cozyMetadata.sourceAccountIdentifier', 'title']),
  options: {
    as:
      'io.cozy.timeseries.grades/account/' +
      sourceAccountIdentifier +
      '/period/' +
      period,
    fetchPolicy: defaultFetchPolicy
  }
})

export const buildAccountsQuery = () => ({
  definition: () =>
    Q('io.cozy.identities')
      .where({
        cozyMetadata: {
          createdByApp: 'pronote'
        }
      })
      .indexFields(['cozyMetadata.createdByApp']),
  options: {
    as: 'io.cozy.identities/pronote',
    fetchPolicy: defaultFetchPolicy
  }
})