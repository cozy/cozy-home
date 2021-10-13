import React from 'react'
import { useClient } from 'cozy-client'
import get from 'lodash/get'
import useInstanceSettings from 'hooks/useInstanceSettings'
import flag from 'cozy-flags'

import LogoutButton from './LogoutButton'
import SettingsButton from './SettingsButton'
import HelpButton from './HelpButton'

const cornerButtons = [
  {
    flagName: 'help-is-displayed',
    isDisplayedByDefault: true,
    Button: HelpButton
  },
  {
    flagName: 'settings-is-displayed',
    isDisplayedByDefault: false,
    Button: SettingsButton
  },
  {
    flagName: 'logout-is-displayed',
    isDisplayedByDefault: true,
    Button: LogoutButton
  }
]

const flagWithFallbackValue = (flagName, fallback) =>
  flag(flagName) === null ? fallback : flag(flagName)

export const HeroHeader = () => {
  const client = useClient()
  const rootURL = client.getStackClient().uri
  const { host } = new URL(rootURL)

  const { data: instanceSettings } = useInstanceSettings(client)
  const publicName = get(instanceSettings, 'public_name', '')

  return (
    <header className="hero-header">
      <div className="corner">
        {cornerButtons.map(({ flagName, isDisplayedByDefault, Button }) =>
          flagWithFallbackValue(
            `home.corner.${flagName}`,
            isDisplayedByDefault
          ) ? (
            <Button key={flagName} />
          ) : null
        )}
      </div>
      <div>
        <img className="hero-avatar" src={`${rootURL}/public/avatar`} />
      </div>
      <h1 className="hero-title">{publicName}</h1>
      <h2 className="hero-subtitle">{host}</h2>
    </header>
  )
}

export default HeroHeader
