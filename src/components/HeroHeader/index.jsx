import React from 'react'
import PropTypes from 'prop-types'
import { withClient } from 'cozy-client'
import get from 'lodash/get'
import useInstanceSettings from 'hooks/useInstanceSettings'
import useCustomWallpaper from 'hooks/useCustomWallpaper'
import flag from 'cozy-flags'

import LogoutButton from './LogoutButton'
import SettingsButton from './SettingsButton'

const HeroHeader = ({ client }) => {
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
    flag('home_corner_logout') === null ? true : flag('home_corner_logout')
  const showSettings =
    flag('home_corner_settings') === null ? false : flag('home_corner_settings')

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
