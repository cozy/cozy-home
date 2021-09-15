import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { ShortcutLink } from './ShortcutLink'
import { useFetchShortcut } from 'cozy-client'

jest.mock('cozy-client', () => {
  return {
    useClient: () => {},
    useFetchShortcut: jest.fn()
  }
})

jest.mock('cozy-ui/transpiled/react/hooks/useBreakpoints', () => () => ({
  isMobile: false
}))

describe('ShortcutLink', () => {
  it('should render a shortcut link with shortcut name initial', () => {
    useFetchShortcut.mockReturnValue({
      shortcutInfos: { data: { attributes: { url: 'http://cozy.io' } } }
    })

    const file = { _id: '123', name: 'cozy.io.url', type: 'file' }

    render(<ShortcutLink file={file} />)

    expect(screen.getByRole('heading')).toHaveTextContent('cozy.io')
    expect(screen.getByRole('link')).toHaveAttribute('href', 'http://cozy.io')
    expect(screen.getByRole('link')).toHaveAttribute('target', '_blank')
    expect(screen.getByRole('link')).toHaveTextContent('C')
  })

  it('should render a custom icon from metadata', () => {
    useFetchShortcut.mockReturnValue({
      shortcutInfos: {
        data: {
          attributes: { url: 'http://cozy.io', metadata: { icon: '<svg />' } }
        }
      }
    })

    const file = { _id: '123', name: 'cozy.io.url', type: 'file' }

    render(<ShortcutLink file={file} />)

    expect(screen.getByRole('heading')).toHaveTextContent('cozy.io')
    expect(screen.getByRole('link')).toHaveAttribute('href', 'http://cozy.io')
    expect(screen.getByRole('link')).toHaveAttribute('target', '_blank')
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      'data:image/svg+xml;base64,PHN2ZyAvPg=='
    )
  })
})
