import React, { useState } from 'react'

import Grid from 'cozy-ui/transpiled/react/Grid'
import SquareAppIcon from 'cozy-ui/transpiled/react/SquareAppIcon'

import { GroupedSectionViewProps } from 'components/Sections/SectionsTypes'
import { SectionHeader } from 'components/Sections/SectionHeader'
import SectionDialog from 'components/Sections/SectionDialog'
import AppIcon from 'cozy-ui/transpiled/react/AppIcon'

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
        name="Mes raccourcis"
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
                  <Grid container spacing={0}>
                    {section.items.slice(0, 4).map(item => {
                      return (
                        <Grid item xs={6} key={item.id}>
                          <AppIcon
                            app={item}
                            type="app"
                            className="item-grid-icon"
                          />
                        </Grid>
                      )
                    })}
                  </Grid>
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
