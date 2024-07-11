import React, { useRef, useState } from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import { GroupedSectionViewProps } from 'components/Sections/SectionsTypes'
import { SectionHeader } from 'components/Sections/SectionHeader'
import AddServiceTile from 'components/AddServiceTile'
import GroupedSectionTile from 'components/Sections/GroupedSectionTile'

export const GroupedSectionView = ({
  sections
}: GroupedSectionViewProps): JSX.Element => {
  const [menuState, setMenuState] = useState(false)
  const anchorRef = useRef(null)
  const toggleMenu = (): void => setMenuState(!menuState)
  const { t } = useI18n()

  const isServicesView = sections.find(section => section.type === 'category')

  return (
    <div className="shortcuts-list-wrapper u-m-auto u-w-100">
      <SectionHeader
        anchorRef={anchorRef}
        toggleMenu={toggleMenu}
        menuState={menuState}
      />

      <div className="shortcuts-list u-w-100 u-mv-3 u-mv-2-t u-mh-auto u-flex-justify-center">
        {sections.map(section => (
          <GroupedSectionTile key={section.id} section={section} />
        ))}

        {isServicesView && <AddServiceTile label={t('add_service')} />}
      </div>
    </div>
  )
}
