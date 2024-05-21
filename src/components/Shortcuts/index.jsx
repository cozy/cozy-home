import React from 'react'
import flag from 'cozy-flags'

import { ShortcutsView } from './ShortcutsView'
import { SectionsView } from 'components/Sections/SectionsView'

export const Shortcuts = ({ shortcutsDirectories }) =>
  flag('home.sections') ? (
    <SectionsView data={shortcutsDirectories} />
  ) : (
    <ShortcutsView shortcutsDirectories={shortcutsDirectories} />
  )

export default Shortcuts
