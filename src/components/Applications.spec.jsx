import React from 'react'
import { render, act } from '@testing-library/react'
import flag from 'cozy-flags'

import AppLike from '../../test/AppLike'
import { Applications } from './Applications'
import useHomeShortcuts from '../hooks/useHomeShortcuts'
import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme'

jest.mock('cozy-flags', () => {
  return jest.fn().mockReturnValue(null)
})

jest.mock('hooks/useHomeShortcuts', () => jest.fn().mockReturnValue([]))

const setup = () => {
  const root = render(
    <AppLike>
      <MuiCozyTheme>
        <Applications />
      </MuiCozyTheme>
    </AppLike>
  )
  return { root }
}

describe('Applications', () => {
  it('has no log out button', () => {
    const { root } = setup()
    expect(root.queryByText('Log out')).toBeFalsy()
  })

  it('has a log out button when the right flag is active', () => {
    flag.mockImplementation(flagName => {
      if (flagName === 'home.mainlist.show-logout') return true
      else return null
    })
    const { root } = setup()
    expect(root.getByText('Log out')).toBeTruthy()
  })

  it('displays retrieved shortcuts', async () => {
    const shortcuts = [
      { id: '1', name: 'toto.txt' },
      { id: '2', name: 'tata.txt' }
    ]
    useHomeShortcuts.mockImplementation(() => shortcuts)
    const { root } = setup()

    // This is necessary since there are asynchronous effects in the
    // shortcut tile
    await act(async () => {})
    expect(root.getByText('toto.txt')).toBeTruthy()
    expect(root.getByText('tata.txt')).toBeTruthy()
  })
})
