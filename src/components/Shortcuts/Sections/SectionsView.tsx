import React from 'react'
import {
  Section,
  SectionsViewProps
} from 'components/Shortcuts/Sections/SectionsTypes'
import { SectionView } from 'components/Shortcuts/Sections/SectionView'

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
