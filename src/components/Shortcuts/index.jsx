import React from 'react'

import { useSettings } from 'cozy-client'
import flag from 'cozy-flags'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'

import shortcutsDirectoriesFixture from 'components/Sections/fixtures/shortcutsDirectories.json'
import shortscutsLayoutFixture from 'components/Sections/fixtures/shortcutsLayout.json'
import { SectionView } from 'components/Sections/SectionView'
import { ShortcutsView } from 'components/Shortcuts/ShortcutsView'
import { formatSections } from 'components/Sections/utils'
import { GroupedSectionView } from 'components/Sections/GroupedSectionsView'

export const Shortcuts = ({ shortcutsDirectories }) => {
  const { values } = useSettings('home', ['shortcutsLayout'])
  const shortcutsLayout = values?.shortcutsLayout
  const { isMobile } = useBreakpoints()

  if (flag('home.detailed_sections-dev')) {
    const useFixtures = flag('home.detailed_sections-debug')
    const [ungroupedSections, groupedSections] = formatSections(
      useFixtures ? shortcutsDirectoriesFixture : shortcutsDirectories,
      useFixtures ? shortscutsLayoutFixture : shortcutsLayout,
      isMobile
    )

    return (
      <>
        {ungroupedSections.length > 0 &&
          ungroupedSections.map(section => (
            <SectionView key={section.id} section={section} />
          ))}

        {groupedSections.length > 0 && (
          <GroupedSectionView sections={groupedSections} />
        )}
      </>
    )
  } else {
    return <ShortcutsView shortcutsDirectories={shortcutsDirectories} />
  }
}

export default Shortcuts
