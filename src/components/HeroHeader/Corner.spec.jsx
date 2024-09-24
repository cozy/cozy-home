import React from 'react'
import { render } from '@testing-library/react'

import flag from 'cozy-flags'
import { WebviewIntentProvider } from 'cozy-intent'

import AppLike from 'test/AppLike'
import Corner from './Corner'

jest.mock(
  './SettingsButton',
  () =>
    function SettingsButton() {
      return <div>Settings</div>
    }
)
jest.mock('cozy-flags', () => {
  return jest.fn().mockReturnValue(null)
})
jest.mock('cozy-client', () => ({
  ...jest.requireActual('cozy-client'),
  useInstanceInfo: jest
    .fn()
    .mockReturnValue({ isLoaded: true, context: { data: {} } })
}))

describe('Corner', () => {
  it('should only render the log out button', () => {
    const root = render(
      <WebviewIntentProvider>
        <AppLike>
          <Corner />
        </AppLike>
      </WebviewIntentProvider>
    )

    expect(root.getByText('Log out')).toBeTruthy()
    expect(root.getByText('Help')).toBeTruthy()
    expect(root.queryByText('Settings')).toBeFalsy()
  })

  it('should render buttons based on flags', () => {
    flag.mockImplementation(flagName => {
      if (flagName === 'home.corner.logout-is-displayed') return false
      else if (flagName === 'home.corner.settings-is-displayed') return true
      else if (flagName === 'home.corner.help-is-displayed') return false
      else return null
    })
    const root = render(
      <WebviewIntentProvider>
        <Corner />
      </WebviewIntentProvider>
    )
    expect(root.queryByText('Log out')).toBeFalsy()
    expect(root.getByText('Settings')).toBeTruthy()
    expect(root.queryByText('Help')).toBeFalsy()
  })
})
