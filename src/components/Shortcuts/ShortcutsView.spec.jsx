import React from 'react'

import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import { ShortcutsView } from './ShortcutsView'
import AppLike from 'test/AppLike'
import CozyTheme from 'cozy-ui/transpiled/react/providers/CozyTheme'

describe('Shortcuts', () => {
  it('Should display nothing if nothing was found', () => {
    const { container } = render(
      <AppLike>
        <CozyTheme>
          <ShortcutsView shortcutsDirectories={null} />
        </CozyTheme>
      </AppLike>
    )
    expect(container).toMatchSnapshot()
  })

  it('Should display a shortcut directory with its files', async () => {
    const listName = 'List title'
    const listItem = 'List item'

    const root = render(
      <AppLike>
        <CozyTheme>
          <ShortcutsView
            shortcutsDirectories={[
              { name: listName, shortcuts: [{ name: listItem }] }
            ]}
          />
        </CozyTheme>
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
        <CozyTheme>
          <ShortcutsView shortcutsDirectories={shortcutsDirectories} />
        </CozyTheme>
      </AppLike>
    )

    expect(root).toMatchSnapshot()
  })
})
