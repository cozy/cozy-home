import React from 'react'
import PropTypes from 'prop-types'
import { withClient } from 'cozy-client'
import get from 'lodash/get'
import useInstanceSettings from 'hooks/useInstanceSettings'
import useCustomWallpaper from 'hooks/useCustomWallpaper'
import flag from 'cozy-flags'

import LogoutButton from './LogoutButton'
import SettingsButton from './SettingsButton'

export const HeroHeader = ({ client }) => {
  const {
    fetchStatus,
    data: { wallpaperLink }
  } = useCustomWallpaper(client)
  const rootURL = client.getStackClient().uri
  const { host } = new URL(rootURL)
  const { cozyDefaultWallpaper } = client.getInstanceOptions()

  let backgroundURL = null
  if (fetchStatus !== 'loading')
    backgroundURL = wallpaperLink || cozyDefaultWallpaper

  const { data: instanceSettings } = useInstanceSettings(client)
  const publicName = get(instanceSettings, 'public_name', '')

  const showLogout =
    flag('home.corner.logout-is-displayed') === null
      ? true
      : flag('home.corner.logout-is-displayed')
  const showSettings =
    flag('home.corner.settings-is-displayed') === null
      ? false
      : flag('home.corner.settings-is-displayed')

  return (
    <header
      className="hero-header"
      style={{ backgroundImage: `url(${backgroundURL})` }}
    >
      <div className="corner">
        {showLogout && <LogoutButton />}
        {showSettings && <SettingsButton />}
      </div>
      <div>
        <img className="hero-avatar" src={`${rootURL}/public/avatar`} />
      </div>
      <h1 className="hero-title">{publicName}</h1>
      <h2 className="hero-subtitle">{host}</h2>
    </header>
  )
}

HeroHeader.propTypes = {
  client: PropTypes.object.isRequired
}

export default withClient(HeroHeader)
