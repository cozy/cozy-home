import React from 'react'
import { shallow } from 'enzyme'
import { Applications } from './Applications'
import LogoutTile from './LogoutTile'
import flag from 'cozy-flags'

jest.mock('cozy-flags', () => {
  return jest.fn().mockReturnValue(null)
})

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
})
