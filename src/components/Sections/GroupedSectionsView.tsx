import React, { useState } from 'react'

import SquareAppIcon from 'cozy-ui/transpiled/react/SquareAppIcon'

import { GroupedSectionViewProps } from 'components/Sections/SectionsTypes'
import { SectionHeader } from 'components/Sections/SectionHeader'
import SectionDialog from 'components/Sections/SectionDialog'
import SectionAppGroup from 'components/Sections/SectionAppGroup'
import { get4FirstItems } from 'components/Sections/utils'

export const GroupedSectionView = ({
  sections
}: GroupedSectionViewProps): JSX.Element => {
  const [menuState, setMenuState] = useState(false)
  const anchorRef = React.useRef(null)
  const toggleMenu = (): void => setMenuState(!menuState)
  const [dialogSectionId, setDialogSectionId] = useState('')

  return (
    <div className="shortcuts-list-wrapper u-m-auto u-w-100">
      <SectionHeader
        anchorRef={anchorRef}
        toggleMenu={toggleMenu}
        menuState={menuState}
      />

      <div className="shortcuts-list u-w-100 u-mv-3 u-mv-2-t u-mh-auto u-flex-justify-center">
        {sections.map(section => {
          return (
            <a
              key={section.id}
              onClick={(): void => setDialogSectionId(section.id)}
              className="scale-hover u-c-pointer"
            >
              <SquareAppIcon
                name={section.name}
                IconContent={
                  <SectionAppGroup items={get4FirstItems(section)} />
                }
              />
            </a>
          )
        })}
      </div>

      {dialogSectionId && (
        <SectionDialog
          sections={sections}
          hasDialog={dialogSectionId}
          onClose={(): void => setDialogSectionId('')}
        />
      )}
    </div>
  )
}
