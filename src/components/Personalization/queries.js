import CozyClient, { Q } from 'cozy-client'
const FIVE_MINUTES = 5 * 60 * 1000
export const SETTINGS_DOCTYPE = 'io.cozy.settings'

export const buildSettingsInstanceQuery = () => ({
  definition: Q(SETTINGS_DOCTYPE).getById('io.cozy.settings.instance'),
  options: {
    as: `${SETTINGS_DOCTYPE}/io.cozy.settings.instance`,
    fetchPolicy: CozyClient.fetchPolicies.olderThan(FIVE_MINUTES),
    singleDocData: true
  }
})