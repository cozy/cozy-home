import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import AppLike from 'test/AppLike'

import { ShortcutLink } from './ShortcutLink'
import { useFetchShortcut } from 'cozy-client'

jest.mock('cozy-client', () => {
  return {
    ...jest.requireActual('cozy-client'),
    useClient: () => {},
    useFetchShortcut: jest.fn(),
    withClient: jest.fn()
  }
})

describe('ShortcutLink', () => {
  it('should render a shortcut link with shortcut name initial', () => {
    useFetchShortcut.mockReturnValue({
      shortcutInfos: { data: { attributes: { url: 'http://cozy.io' } } }
    })

    const file = { _id: '123', name: 'cozy.io.url', type: 'file' }

    render(
      <AppLike>
        <ShortcutLink file={file} />
      </AppLike>
    )

    expect(screen.getByRole('heading', { level: 6 })).toHaveTextContent(
      'cozy.io'
    )
    expect(screen.getByRole('link')).toHaveAttribute('href', 'http://cozy.io')
    expect(screen.getByRole('link')).toHaveAttribute('target', '_blank')
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('C')
  })

  it.skip('should render a custom icon from metadata', () => {
    // skipped because SquareAppIcon does not implement it yet
    useFetchShortcut.mockReturnValue({
      shortcutInfos: {
        data: {
          attributes: { url: 'http://cozy.io', metadata: { icon: '<svg />' } }
        }
      }
    })

    const file = { _id: '123', name: 'cozy.io.url', type: 'file' }

    render(
      <AppLike>
        <ShortcutLink file={file} />
      </AppLike>
    )

    expect(screen.getByRole('heading', { level: 6 })).toHaveTextContent(
      'cozy.io'
    )
    expect(screen.getByRole('link')).toHaveAttribute('href', 'http://cozy.io')
    expect(screen.getByRole('link')).toHaveAttribute('target', '_blank')
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      'data:image/svg+xml;base64,PHN2ZyAvPg=='
    )
  })
})
