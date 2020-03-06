import React from 'react'
import { shallow } from 'enzyme'
import { Applications } from './Applications'
import LogoutTile from './LogoutTile'
import flag from 'cozy-flags'
import ShortcutTile from './ShortcutTile'
import useHomeShortcuts from '../hooks/useHomeShortcuts'

jest.mock('cozy-flags', () => {
  return jest.fn().mockReturnValue(null)
})

jest.mock('hooks/useHomeShortcuts', () => jest.fn().mockReturnValue([]))

describe('Applications', () => {
  it('has no log out button', () => {
    const comp = shallow(<Applications />)
    expect(comp.find(LogoutTile).length).toBe(0)
  })

  it('has a log out button when the right flag is active', () => {
    flag.mockImplementation(flagName => {
      if (flagName === 'home.mainlist.show-logout') return true
      else return null
    })
    const comp = shallow(<Applications />)
    expect(comp.find(LogoutTile).length).toBe(1)
  })

  it('displays retrieved shortcuts', () => {
    const shortcuts = [{ id: '1' }, { id: '2' }]
    useHomeShortcuts.mockImplementation(() => shortcuts)
    const comp = shallow(<Applications />)
    expect(comp.find(ShortcutTile).length).toBe(shortcuts.length)
  })
})
