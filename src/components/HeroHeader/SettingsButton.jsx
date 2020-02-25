import React from 'react'
import { Query, Q, models } from 'cozy-client'
import AppLinker from 'cozy-ui/react/AppLinker'
import { useI18n } from 'cozy-ui/react/I18n'
import get from 'lodash/get'

const { applications } = models

import CornerButton from './CornerButton'

const SettingsButton = () => {
  const { lang } = useI18n()
  return (
    <Query query={() => Q('io.cozy.apps').where({ slug: 'settings' })}>
      {({ data }) => {
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
      }}
    </Query>
  )
}

export default SettingsButton
