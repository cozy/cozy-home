import React from 'react'

import { Spinner } from 'cozy-ui/transpiled/react'
import Divider from 'cozy-ui/transpiled/react/MuiCozyTheme/Divider'
import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme'

import { ShortcutLink } from 'components/ShortcutLink'

export const ShortcutsView = ({ shortcutsDirectories }) => {
  return !shortcutsDirectories ? (
    shortcutsDirectories === null ? null : (
      <div className="u-flex u-flex-justify-center">
        <Spinner size="xxlarge" role="progressbar" />
      </div>
    )
  ) : (
    <>
      {shortcutsDirectories.map(directory => (
        <div
          key={directory.name}
          className="shortcuts-list-wrapper u-m-auto u-w-100"
        >
          <MuiCozyTheme variant="inverted">
            <Divider className="u-mv-0">{directory.name}</Divider>
          </MuiCozyTheme>
          <div className="shortcuts-list u-w-100 u-mv-3 u-mv-2-t u-mh-auto u-flex-justify-center">
            {directory.shortcuts.map(shortcut => (
              <ShortcutLink key={shortcut.name} file={shortcut} />
            ))}
          </div>
        </div>
      ))}
    </>
  )
}
