import CozyClient, { Q } from 'cozy-client'

export const defaultFetchPolicy = CozyClient.fetchPolicies.olderThan(30 * 1000)

export const appsConn = {
  query: Q('io.cozy.apps'),
  as: 'io.cozy.apps',
  fetchPolicy: defaultFetchPolicy
}

export const konnectorsConn = {
  query: Q('io.cozy.konnectors'),
  as: 'io.cozy.konnectors',
  fetchPolicy: defaultFetchPolicy
}

export const makeTriggersQuery = {
  definition: () => Q('io.cozy.triggers'),
  options: {
    as: 'io.cozy.triggers',
    fetchPolicy: defaultFetchPolicy
  }
}

export const makeAccountsQuery = {
  definition: () => Q('io.cozy.accounts'),
  options: {
    as: 'io.cozy.accounts',
    fetchPolicy: defaultFetchPolicy
  }
}

export const instanceSettingsConn = {
  query: Q('io.cozy.settings').getById('io.cozy.settings.instance'),
  as: 'io.cozy.settings/io.cozy.settings.instance',
  fetchPolicy: defaultFetchPolicy,
  singleDocData: true
}

export const homeSettingsConn = {
  query: Q('io.cozy.home.settings').limitBy(1),
  as: 'io.cozy.home.settings',
  fetchPolicy: defaultFetchPolicy
}

export const suggestedKonnectorsConn = {
  query: () =>
    Q('io.cozy.apps.suggestions')
      .where({ silenced: false })
      .indexFields(['silenced', 'slug'])
      .sortBy([{ silenced: 'asc' }, { slug: 'asc' }]),
  as: 'app-suggestions',
  fetchPolicy: defaultFetchPolicy
}

export const mkHomeMagicFolderConn = t => {
  return {
    query: Q('io.cozy.files')
      .where({ path: t('home_config_magic_folder') })
      .indexFields(['path']),
    as: 'home/io.cozy.files/path=magic-folder',
    fetchPolicy: defaultFetchPolicy
  }
}
export const fetchKonnectorBySlug = slug => {
  return {
    query: Q('io.cozy.konnectors').getById(`io.cozy.konnectors/${slug}`),
    as: `io.cozy.konnectors/${slug}`,
    fetchPolicy: defaultFetchPolicy
  }
}
export const mkHomeShorcutsConn = folderId => {
  return {
    query: Q('io.cozy.files')
      .where({ dir_id: folderId, class: 'shortcut' })
      .indexFields(['dir_id', 'class']),
    as: `home/io.cozy.files/dir_id=${folderId},class=shortcut`,
    fetchPolicy: defaultFetchPolicy
  }
}

export const mkHomeCustomShorcutsDirConn = ({
  currentFolderId,
  type = 'directory',
  sortAttribute = 'name',
  sortOrder = 'asc'
}) => ({
  query: Q('io.cozy.files')
    .where({
      dir_id: currentFolderId,
      type,
      [sortAttribute]: { $gt: null }
    })
    .partialIndex({
      _id: {
        $ne: 'io.cozy.files.trash-dir'
      }
    })
    .indexFields(['dir_id', 'type', sortAttribute])
    .sortBy([
      { dir_id: sortOrder },
      { type: sortOrder },
      { [sortAttribute]: sortOrder }
    ])
    .limitBy(100),
  options: {
    as: `${type} ${currentFolderId} ${sortAttribute} ${sortOrder}`,
    fetchPolicy: defaultFetchPolicy
  }
})

export const mkHomeCustomShorcutsConn = foldersId => {
  return {
    query: Q('io.cozy.files')
      .where({
        class: 'shortcut',
        dir_id: {
          $in: foldersId
        },
        name: { $gt: null }
      })
      .indexFields(['class', 'dir_id', 'name'])
      .sortBy([{ class: 'asc' }, { dir_id: 'asc' }, { name: 'asc' }])
      .limitBy(100),
    as: 'home-shortcuts',
    fetchPolicy: defaultFetchPolicy
  }
}

export const buildContextQuery = () => ({
  definition: () => Q('io.cozy.settings').getById('io.cozy.settings.context'),
  options: {
    as: 'io.cozy.settings/io.cozy.settings.context',
    fetchPolicy: defaultFetchPolicy,
    singleDocData: true
  }
})

export const buildExistingTimeseriesGeojsonQuery = () => ({
  definition: Q('io.cozy.timeseries.geojson')
    .where({ _id: { $gt: null } })
    .select(['_id'])
    .indexFields(['_id'])
    .limitBy(1),
  options: {
    as: 'io.cozy.timeseries.geojson/existing-timeseries-geojson',
    fetchPolicy: CozyClient.fetchPolicies.olderThan(60 * 60 * 24 * 365 * 1000)
  }
})

export const contextQuery = {
  definition: Q('io.cozy.settings').getById('io.cozy.settings.context'),
  options: {
    as: 'io.cozy.settings/io.cozy.settings.context',
    fetchPolicy: defaultFetchPolicy,
    singleDocData: true
  }
}
