import React from 'react'

import { GroupedSectionView } from 'components/Sections/GroupedSectionsView'
import { useSections } from 'components/Sections/SectionsContext'

export const GroupedServices = (): JSX.Element | null => {
  const { konnectorsByCategory } = useSections()

  if (konnectorsByCategory.length === 0) return null

  return <GroupedSectionView sections={konnectorsByCategory} />
}

export default GroupedServices
