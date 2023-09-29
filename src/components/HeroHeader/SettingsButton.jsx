import React from 'react'
import { queryConnect, Q, models, fetchPolicies } from 'cozy-client'
import get from 'lodash/get'

import AppLinker from 'cozy-ui/transpiled/react/AppLinker'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import GearIcon from 'cozy-ui/transpiled/react/Icons/Gear'

import CornerButton from './CornerButton'

const { applications } = models

const SettingsButton = ({ settingsAppQuery: { data: app } }) => {
  const { lang } = useI18n()
  const appHref = get(app, 'links.related')
  const slug = get(app, 'slug')
  const displayName = applications.getAppDisplayName(app, lang)

  return slug && appHref ? (
    <AppLinker app={app} href={appHref}>
      {({ onClick, href }) => (
        <CornerButton
          label={displayName}
          href={href}
          onClick={onClick}
          icon={GearIcon}
        />
      )}
    </AppLinker>
  ) : null
}

const query = () => Q('io.cozy.apps').getById('io.cozy.apps/settings')
const olderThan30s = fetchPolicies.olderThan(30 * 1000)

export default queryConnect({
  settingsAppQuery: { query, fetchPolicy: olderThan30s, as: 'settingsAppQuery' }
})(SettingsButton)
