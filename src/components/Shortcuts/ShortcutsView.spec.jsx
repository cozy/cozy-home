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

    const root = render(
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
    expect(root).toMatchSnapshot()
  })

  it('Should display multiple sections for multiple directories', () => {
    const shortcutsDirectories = [
      { name: 'a', shortcuts: [{ name: 'b' }] },
      { name: 'c', shortcuts: [{ name: 'd' }] }
    ]

    const root = render(
      <AppLike>
        <MuiCozyTheme>
          <ShortcutsView shortcutsDirectories={shortcutsDirectories} />
        </MuiCozyTheme>
      </AppLike>
    )

    expect(root).toMatchSnapshot()
  })
})
