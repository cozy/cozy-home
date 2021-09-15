import React from 'react'

import { Spinner } from 'cozy-ui/transpiled/react'
import Divider from 'cozy-ui/transpiled/react/MuiCozyTheme/Divider'

import { ShortcutLink } from 'components/ShortcutLink'

export const ShortcutsView = ({ shortcutsDirectories }) =>
  !shortcutsDirectories ? (
    shortcutsDirectories === null ? null : (
      <div className="shortcuts-spinner">
        <Spinner size="xxlarge" role="progressbar" />
      </div>
    )
  ) : (
    <>
      {shortcutsDirectories.map(directory => (
        <section role="group" key={directory.name}>
          <header role="heading" className="shortcuts-name" aria-level="2">
            <Divider>{directory.name}</Divider>
          </header>

          <ul role="list" className="shortcuts-list">
            {directory.shortcuts.map(shortcut => (
              <li key={shortcut.name} role="listitem">
                <ShortcutLink file={shortcut} className="item" />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  )
