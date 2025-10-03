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

export const buildDriveSharedQuery = () => ({
  definition: () =>
    Q('io.cozy.files')
      .where({ type: "file", trashed: false })
      .sortBy([{'cozyMetadata.updatedAt': 'desc'}])
      .limitBy(20),
  options: {
    as: 'io.cozy.files/shared',
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