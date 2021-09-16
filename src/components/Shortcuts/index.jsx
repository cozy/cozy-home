import React from 'react'

import useCustomShortcuts from './useCustomShortcuts'
import { ShortcutsView } from './ShortcutsView'

export const Shortcuts = () => <ShortcutsView {...useCustomShortcuts()} />

export default Shortcuts
