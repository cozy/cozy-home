import React from 'react'

import { useQuery } from 'cozy-client'
import flag from 'cozy-flags'

import { ShortcutsView } from './ShortcutsView'
import { SectionView } from 'components/Sections/SectionView'
import { homeSettingsConn } from 'queries'
import { formatSections } from 'components/Sections/utils'

const TEMP_FIXTURE_DELETE_ASAP = [
  {
    id: '968dae76ae098d95ef402552fd001fcc',
    originalName: 'Applications Toutatice',
    createdByApp: 'toutatice',
    mobile: {
      detailedLine: true,
      grouped: false
    },
    desktop: {
      detailedLine: false,
      grouped: true
    },
    order: 3
  },
  {
    id: '968dae76ae098d95ef402552fd0009c0',
    originalName: 'Infos',
    createdByApp: 'infos',
    mobile: {
      detailedLine: false,
      grouped: true
    },
    desktop: {
      detailedLine: true,
      grouped: true
    },
    order: 1
  }
]

export const Shortcuts = ({ shortcutsDirectories }) => {
  const homeSettingsResult = useQuery(homeSettingsConn.query, homeSettingsConn)

  if (flag('home.detailed_sections-dev')) {
    const fetchedLayout =
      homeSettingsResult.data?.[0]?.shortcutsLayout ?? TEMP_FIXTURE_DELETE_ASAP
    const formattedSections = formatSections(
      shortcutsDirectories,
      fetchedLayout
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
