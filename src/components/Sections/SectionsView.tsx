import React from 'react'

import { useQuery } from 'cozy-client'

import { SectionView } from 'components/Sections/SectionView'
import { Section, SectionsViewProps } from 'components/Sections/SectionsTypes'
import { homeSettingsConn } from 'queries'
import { formatSections } from './utils'

const TEMP_FIXTURE_DELETE_ASAP = [
  {
    id: '968dae76ae098d95ef402552fd001fcc',
    originalName: 'Applications Toutatice',
    createdByApp: 'toutatice',
    mobile: {
      detailedLine: false,
      grouped: false
    },
    desktop: {
      detailedLine: true,
      grouped: true
    },
    order: 3
  },
  {
    id: '968dae76ae098d95ef402552fd0009c0',
    originalName: 'Infos',
    createdByApp: 'infos',
    mobile: {
      detailedLine: true,
      grouped: true
    },
    desktop: {
      detailedLine: false,
      grouped: true
    },
    order: 4
  }
]

export const SectionsView = ({
  data,
  type
}: SectionsViewProps): JSX.Element | null => {
  const homeSettingsResult = useQuery(
    homeSettingsConn.query,
    homeSettingsConn
  ) as {
    data: Record<string, Section[]>[]
  }
  if (!data) return null
  const fetchedLayout =
    homeSettingsResult.data?.[0]?.[`${type}Layout`] ?? TEMP_FIXTURE_DELETE_ASAP
  const formattedSections = formatSections(data, fetchedLayout)

  return (
    <>
      {formattedSections?.map(section => (
        <SectionView key={section.id} section={section} />
      ))}
    </>
  )
}
