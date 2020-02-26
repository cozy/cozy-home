import React from 'react'
import { queryConnect, Q, models, fetchPolicies } from 'cozy-client'
import AppLinker from 'cozy-ui/react/AppLinker'
import { useI18n } from 'cozy-ui/react/I18n'
import get from 'lodash/get'
import CornerButton from './CornerButton'

const { applications } = models

const SettingsButton = ({ settingsAppQuery: { data } }) => {
  const { lang } = useI18n()
  const app = get(data, '[0]')
  const appHref = get(app, 'links.related')
  const slug = get(app, 'slug')
  const displayName = applications.getAppDisplayName(app, lang)

  return slug && appHref ? (
    <AppLinker slug={slug} href={appHref}>
      {({ onClick, href }) => (
        <CornerButton
          label={displayName}
          href={href}
          onClick={onClick}
          icon="gear"
        />
      )}
    </AppLinker>
  ) : null
}

const query = () => Q('io.cozy.apps').where({ slug: 'settings' })
const olderThan30s = fetchPolicies.olderThan(30 * 1000)
export default queryConnect({
  settingsAppQuery: { query, fetchPolicy: olderThan30s, as: 'settingsAppQuery' }
})(SettingsButton)
