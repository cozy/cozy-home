import React from 'react'
import { SectionsViewProps } from 'components/Sections/SectionsTypes'
import { SectionView } from 'components/Sections/SectionView'

export const SectionsView = ({ data }: SectionsViewProps): JSX.Element => {
  return (
    <>
      {data?.map(section => (
        <SectionView key={section.id} section={section} />
      ))}
    </>
  )
}
