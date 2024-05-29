import React from 'react'

import { useSettings } from 'cozy-client'
import flag from 'cozy-flags'

import { SectionView } from 'components/Sections/SectionView'
import { ShortcutsView } from 'components/Shortcuts/ShortcutsView'
import { formatSections } from 'components/Sections/utils'

export const Shortcuts = ({ shortcutsDirectories }) => {
  const { values } = useSettings('home', ['shortcutsLayout'])
  const shortcutsLayout = values?.shortcutsLayout

  if (flag('home.detailed_sections-dev')) {
    const formattedSections = formatSections(
      shortcutsDirectories,
      shortcutsLayout
    )

    return (
      <>
        {formattedSections?.map(section => (
          <SectionView key={section.id} section={section} />
        ))}
      </>
    )
  } else {
    return <ShortcutsView shortcutsDirectories={shortcutsDirectories} />
  }
}

export default Shortcuts
