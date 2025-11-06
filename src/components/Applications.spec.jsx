import React from 'react'
import { render, act } from '@testing-library/react'
import flag from 'cozy-flags'
import { createMockClient } from 'cozy-client/dist/mock'

import AppLike from '@/test/AppLike'
import { Applications } from './Applications'
import CozyTheme from 'cozy-ui-plus/dist/providers/CozyTheme'

jest.mock('cozy-flags', () => {
  return jest.fn().mockReturnValue(null)
})

const setup = ({ queries } = {}) => {
  if (!queries) {
    const client = createMockClient({
      queries: {
        'io.cozy.apps': {
          lastUpdate: new Date(),
          data: [],
          doctype: 'io.cozy.apps',
          hasMore: false
        }
      }
    })

    const root = render(
      <AppLike client={client} store={client.store}>
        <CozyTheme>
          <Applications />
        </CozyTheme>
      </AppLike>
    )
    return { root }
  } else {
    const client = createMockClient({
      queries
    })
    const root = render(
      <AppLike client={client} store={client.store}>
        <CozyTheme>
          <Applications />
        </CozyTheme>
      </AppLike>
    )
    return { root }
  }
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
    const { root } = setup({
      queries: {
        'io.cozy.files/path/Settings/Home': {
          lastUpdate: new Date(),
          data: [{ id: 'folderId' }],
          doctype: 'io.cozy.files',
          hasMore: false
        },
        'io.cozy.files/dir_id/folderId/class/shortcut': {
          lastUpdate: new Date(),
          data: shortcuts,
          doctype: 'io.cozy.files',
          hasMore: false
        },
        'io.cozy.apps': {
          lastUpdate: new Date(),
          data: [],
          doctype: 'io.cozy.apps',
          hasMore: false
        }
      }
    })

    // This is necessary since there are asynchronous effects in the
    // shortcut tile
    await act(async () => {})
    expect(root.getByText('toto.txt')).toBeTruthy()
    expect(root.getByText('tata.txt')).toBeTruthy()
  })
})
