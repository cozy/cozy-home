import React from 'react'
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

export const Corner = () => {
  return (
    <div className="corner u-pos-relative u-flex-self-end">
      {cornerButtons.map(({ flagName, isDisplayedByDefault, Button }) =>
        flagWithFallbackValue(
          `home.corner.${flagName}`,
          isDisplayedByDefault
        ) ? (
          <Button key={flagName} />
        ) : null
      )}
    </div>
  )
}

export default Corner
