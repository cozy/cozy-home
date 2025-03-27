import React from 'react'
import cx from 'classnames'

import Divider from 'cozy-ui/transpiled/react/Divider'
import { isTwakeTheme } from 'cozy-ui/transpiled/react/helpers/isTwakeTheme'

import { ShortcutLink } from 'components/ShortcutLink'

export const ShortcutsView = ({ shortcutsDirectories }) => {
  return !shortcutsDirectories ? null : (
    <>
      {shortcutsDirectories.map(directory => (
        <div
          key={directory.name}
          className="shortcuts-list-wrapper u-m-auto u-w-100"
        >
          <Divider className="u-mv-0" variant="subtitle2">
            {directory.name}
          </Divider>
          <div
            className={cx(
              'shortcuts-list u-w-100 u-mh-auto u-flex-justify-center',
              {
                'shortcuts-list--gutter': isTwakeTheme(),
                'u-mv-3 u-mv-2-t': !isTwakeTheme()
              }
            )}
          >
            {directory.items.map(shortcut => (
              <ShortcutLink key={shortcut.name} file={shortcut} />
            ))}
          </div>
        </div>
      ))}
    </>
  )
}
