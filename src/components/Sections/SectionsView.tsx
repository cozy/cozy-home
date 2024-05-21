import React from 'react'
import { Section, SectionsViewProps } from 'components/Sections/SectionsTypes'
import { SectionView } from 'components/Sections/SectionView'

const sortSections = (sections: Section[]): Section[] =>
  [...sections].sort((a, b) => a.order - b.order)

export const SectionsView = ({ sections }: SectionsViewProps): JSX.Element => {
  return (
    <>
      {sortSections(sections).map(section => (
        <SectionView key={section.id} section={section} />
      ))}
    </>
  )
}
