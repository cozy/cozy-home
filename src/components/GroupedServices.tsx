import React from 'react'

import { GroupedSectionView } from 'components/Sections/GroupedSectionsView'
import { useSections } from 'components/Sections/SectionsContext'
import EmptyServicesListTip from 'components/EmptyServicesListTip'

export const GroupedServices = (): JSX.Element | null => {
  const { displayTutorialTip, konnectorsByCategory } = useSections()

  if (konnectorsByCategory.length === 0) return null

  return (
    <>
      <GroupedSectionView sections={konnectorsByCategory} />
      {displayTutorialTip && <EmptyServicesListTip />}
    </>
  )
}

export default GroupedServices
