import React from 'react'

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { ShortcutsView } from './ShortcutsView'
import AppLike from '../../../test/AppLike'
import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme'

describe('Shortcuts', () => {
  it('Should display a spinner on first render', () => {
    render(
      <AppLike>
        <MuiCozyTheme>
          <ShortcutsView />
        </MuiCozyTheme>
      </AppLike>
    )

    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('Should display nothing if nothing was found', () => {
    const { container } = render(
      <AppLike>
        <MuiCozyTheme>
          <ShortcutsView shortcutsDirectories={null} />
        </MuiCozyTheme>
      </AppLike>
    )
    expect(container).toBeEmptyDOMElement()
  })

  it('Should display a shortcut directory with its files', async () => {
    const listName = 'List title'
    const listItem = 'List item'

    render(
      <AppLike>
        <MuiCozyTheme>
          <ShortcutsView
            shortcutsDirectories={[
              { name: listName, shortcuts: [{ name: listItem }] }
            ]}
          />
        </MuiCozyTheme>
      </AppLike>
    )

    expect(screen.getAllByRole('heading', { level: 2 })[0]).toHaveTextContent(
      listName
    )
    expect(screen.getByRole('listitem')).toBeInTheDocument()
  })

  it('Should display multiple sections for multiple directories', () => {
    const shortcutsDirectories = [
      { name: 'a', shortcuts: [{ name: 'b' }] },
      { name: 'c', shortcuts: [{ name: 'd' }] }
    ]

    render(
      <AppLike>
        <MuiCozyTheme>
          <ShortcutsView shortcutsDirectories={shortcutsDirectories} />
        </MuiCozyTheme>
      </AppLike>
    )

    expect(screen.getAllByRole('group')).toHaveLength(2)
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(4)
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
  })
})
