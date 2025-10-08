import CozyClient, { Q } from 'cozy-client'

const DEFAULT_CACHE_TIMEOUT_QUERIES = 9 * 60 * 1000 // 10 minutes
const defaultFetchPolicy = CozyClient.fetchPolicies.olderThan(
  DEFAULT_CACHE_TIMEOUT_QUERIES
)

export const buildDriveRecentsQuery = () => ({
  definition: () =>
    Q('io.cozy.files')
      .where({ type: "file", trashed: false })
      .sortBy([{'cozyMetadata.updatedAt': 'desc'}])
      .limitBy(20),
  options: {
    as: 'io.cozy.files/recents',
    fetchPolicy: defaultFetchPolicy
  }
})

export const buildDriveFavoritesQuery = () => ({
  definition: () =>
    Q('io.cozy.files')
      .where({ type: "file", trashed: false, "cozyMetadata.favorite": true })
      .sortBy([{ 'cozyMetadata.updatedAt': 'desc' }])
      .limitBy(20),
  options: {
    as: 'io.cozy.files/favorites',
    fetchPolicy: defaultFetchPolicy
  }
})

export const buildDriveSharedQuery = ({ ids }) => ({
  definition: () =>
    Q('io.cozy.files')
      .getByIds(ids)
      .sortBy([{ type: 'asc' }, { name: 'asc' }]),
  options: {
    as: `sharings-by-ids-${ids.join('')}`,
    enabled: true,
    fetchPolicy: defaultFetchPolicy
  }
})

export const buildDriveFoldersQuery = () => ({
  definition: () =>
    Q('io.cozy.files')
      .where({ type: "directory" })
      .sortBy([{'cozyMetadata.updatedAt': 'desc'}])
      .limitBy(20),
  options: {
    as: 'io.cozy.files/directories',
    fetchPolicy: defaultFetchPolicy
  }
})

export const buildDriveTrashedQuery = () => ({
  definition: () =>
    Q('io.cozy.files')
      .where({ type: "file", trashed: true })
      .sortBy([{'cozyMetadata.updatedAt': 'desc'}])
      .limitBy(20),
  options: {
    as: 'io.cozy.files/trashed',
    fetchPolicy: defaultFetchPolicy
  }
})