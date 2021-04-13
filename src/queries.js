import CozyClient, { Q } from 'cozy-client'

export const defaultFetchPolicy = CozyClient.fetchPolicies.olderThan(30 * 1000)
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

export const mkHomeMagicFolderConn = t => {
  return {
    query: Q('io.cozy.files').where({ path: t('home_config_magic_folder') }),
    as: 'home/io.cozy.files/path=magic-folder',
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
