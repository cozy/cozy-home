import React, { Component } from 'react'

import { translate } from 'cozy-ui/react/I18n'
import AppIcon from 'cozy-ui/react/AppIcon'

const fetchIcon = cozyClient => async url => {
  let icon
  try {
    const resp = await cozyClient.fetch('GET', url)
    if (!resp.ok)
      throw new Error(`Error while fetching icon ${resp.statusText}: ${url}`)
    icon = await resp.blob()
  } catch (error) {
    throw error
  }
  const mimeType = icon.type
  if (mimeType && mimeType.match(/^image\/.*$/)) {
    return URL.createObjectURL(icon)
  }
  throw new Error(`App icon ${url} is not an image.`)
}

export class AppTile extends Component {
  render() {
    const { app, t } = this.props
    const { client } = this.context
    const displayName = app.name_prefix
      ? `${app.name_prefix} ${app.name}`
      : app.name
    return (
      <a className="item-wrapper" href={app.links && app.links.related}>
        <div className="item-icon">
          <AppIcon
            alt={t('app.logo.alt', { name: displayName })}
            app={app}
            fetchIcon={fetchIcon(client)}
          />
        </div>
        <h3 className="item-title">{displayName}</h3>
      </a>
    )
  }
}

export default translate()(AppTile)
