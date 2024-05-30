import React from 'react'

import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import { ShortcutsView } from './ShortcutsView'
import AppLike from 'test/AppLike'

describe('Shortcuts', () => {
  it('Should display nothing if nothing was found', () => {
    const { container } = render(
      <AppLike>
        <ShortcutsView shortcutsDirectories={null} />
      </AppLike>
    )
    expect(container).toMatchSnapshot()
  })

  it('Should display a shortcut directory with its files', async () => {
    const listName = 'List title'
    const listItem = 'List item'

    const root = render(
      <AppLike>
        <ShortcutsView
          shortcutsDirectories={[
            { name: listName, items: [{ name: listItem }] }
          ]}
        />
      </AppLike>
    )
    expect(root).toMatchSnapshot()
  })

  it('Should display multiple sections for multiple directories', () => {
    const shortcutsDirectories = [
      { name: 'a', items: [{ name: 'b' }] },
      { name: 'c', items: [{ name: 'd' }] }
    ]

    const root = render(
      <AppLike>
        <ShortcutsView shortcutsDirectories={shortcutsDirectories} />
      </AppLike>
    )

    expect(root).toMatchSnapshot()
  })
})
