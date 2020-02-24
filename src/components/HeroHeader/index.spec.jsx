import React from 'react'
import { shallow } from 'enzyme'
import { HeroHeader } from './index'
import LogoutButton from './LogoutButton'
import SettingsButton from './SettingsButton'
import flag from 'cozy-flags'

jest.mock('cozy-flags', () => {
  return jest.fn().mockReturnValue(null)
})

describe('HeroHeader', () => {
  const mockClient = {
    getStackClient: () => ({
      uri: 'http://cozy.example.com'
    }),
    getInstanceOptions: jest
      .fn()
      .mockReturnValue({ cozyDefaultWallpaper: 'default-wallpaper.jpg' })
  }

  it('should render the default background', () => {
    const component = shallow(<HeroHeader client={mockClient} />)
    expect(component.prop('style').backgroundImage).toEqual(
      'url(default-wallpaper.jpg)'
    )
  })

  it('should only render the log out button', () => {
    const component = shallow(<HeroHeader client={mockClient} />)
    expect(component.find(LogoutButton).length).toBe(1)
    expect(component.find(SettingsButton).length).toBe(0)
  })

  it('should render buttons based on flags', () => {
    flag.mockImplementation(flagName => {
      if (flagName === 'home_corner_logout') return false
      else if (flagName === 'home_corner_settings') return true
      else return null
    })
    const component = shallow(<HeroHeader client={mockClient} />)
    expect(component.find(LogoutButton).length).toBe(0)
    expect(component.find(SettingsButton).length).toBe(1)
  })
})
