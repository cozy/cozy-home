import React from 'react'
import flag from 'cozy-flags'
import { SectionView } from 'components/Sections/SectionView'
import { ShortcutsView } from 'components/Shortcuts/ShortcutsView'
import { GroupedSectionView } from 'components/Sections/GroupedSectionsView'
import { useSections } from 'components/Sections/SectionsContext'

export const Shortcuts = (): JSX.Element => {
  const { ungroupedSections, groupedSections, shortcutsDirectories } =
    useSections()

  if (flag('home.detailed-sections-dev')) {
    return (
      <>
        {ungroupedSections?.length > 0 &&
          ungroupedSections?.map(section => (
            <SectionView key={section.id} section={section} />
          ))}

        {groupedSections?.length > 0 && (
          <GroupedSectionView sections={groupedSections} />
        )}
      </>
    )
  } else {
    return <ShortcutsView shortcutsDirectories={shortcutsDirectories} />
  }
}

export default Shortcuts
