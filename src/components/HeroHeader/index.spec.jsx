import React from 'react'
import { render } from '@testing-library/react'
import { HeroHeader } from './index'
import { createMockClient } from 'cozy-client/dist/mock'
import flag from 'cozy-flags'
import AppLike from '../../../test/AppLike'
import useInstanceSettings from 'hooks/useInstanceSettings'

jest.mock(
  './SettingsButton',
  () =>
    function SettingsButton() {
      return <div>Settings</div>
    }
)
jest.mock('hooks/useInstanceSettings', () => jest.fn())
jest.mock('cozy-flags', () => {
  return jest.fn().mockReturnValue(null)
})

useInstanceSettings.mockReturnValue({
  fetchStatus: 'loaded',
  data: {}
})

describe('HeroHeader', () => {
  const mockClient = createMockClient({
    clientOptions: {
      uri: 'http://cozy.example.com'
    }
  })

  it('should only render the log out button', () => {
    const root = render(
      <AppLike client={mockClient}>
        <HeroHeader />
      </AppLike>
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
      <AppLike client={mockClient}>
        <HeroHeader />
      </AppLike>
    )
    expect(root.queryByText('Log out')).toBeFalsy()
    expect(root.getByText('Settings')).toBeTruthy()
    expect(root.queryByText('Help')).toBeFalsy()
  })
})
