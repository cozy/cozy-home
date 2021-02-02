import React from 'react'
import { render } from '@testing-library/react'
import { HeroHeader } from './index'
import { createMockClient } from 'cozy-client/dist/mock'
import flag from 'cozy-flags'
import AppLike from '../../../test/AppLike'
import useCustomWallpaper from 'hooks/useCustomWallpaper'
import useInstanceSettings from 'hooks/useInstanceSettings'

jest.mock(
  './SettingsButton',
  () =>
    function SettingsButton() {
      return <div>Settings</div>
    }
)
jest.mock('hooks/useCustomWallpaper', () => jest.fn())
jest.mock('hooks/useInstanceSettings', () => jest.fn())
jest.mock('cozy-flags', () => {
  return jest.fn().mockReturnValue(null)
})

useCustomWallpaper.mockReturnValue({
  fetchStatus: 'loaded',
  data: { wallpaperLink: 'http://wallpaper.png' }
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

  mockClient.getInstanceOptions = jest
    .fn()
    .mockReturnValue({ cozyDefaultWallpaper: 'default-wallpaper.jpg' })

  it('should render the default background', () => {
    useCustomWallpaper.mockReturnValue({
      fetchStatus: 'loaded',
      data: { wallpaperLink: null }
    })
    const root = render(
      <AppLike client={mockClient}>
        <HeroHeader />
      </AppLike>
    )
    const header = root.getByRole('image')
    expect(header.style.backgroundImage).toEqual('url(default-wallpaper.jpg)')
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
