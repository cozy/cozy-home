import React from 'react'
import { shallow } from 'enzyme'
import { HeroHeader } from './index'
import LogoutButton from './LogoutButton'
import SettingsButton from './SettingsButton'
import HelpButton from './HelpButton'
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
    expect(component.find(HelpButton).length).toBe(1)
  })

  it('should render buttons based on flags', () => {
    flag.mockImplementation(flagName => {
      if (flagName === 'home.corner.logout-is-displayed') return false
      else if (flagName === 'home.corner.settings-is-displayed') return true
      else if (flagName === 'home.corner.help-is-displayed') return false
      else return null
    })
    const component = shallow(<HeroHeader client={mockClient} />)
    expect(component.find(LogoutButton).length).toBe(0)
    expect(component.find(SettingsButton).length).toBe(1)
    expect(component.find(HelpButton).length).toBe(0)
  })
})
