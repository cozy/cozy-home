import React from 'react'
import { useKonnectorsByCat } from 'components/Sections/hooks/useKonnectorsByCat'
import { GroupedSectionView } from './Sections/GroupedSectionsView'

export const GroupedServices = (): JSX.Element | null => {
  const konnectorsByCategory = useKonnectorsByCat()

  if (konnectorsByCategory.length === 0) return null

  return <GroupedSectionView sections={konnectorsByCategory} />
}

export default GroupedServices
