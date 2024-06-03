import React, { useState } from 'react'

import Grid from 'cozy-ui/transpiled/react/Grid'
import SquareAppIcon from 'cozy-ui/transpiled/react/SquareAppIcon'

import { GroupedSectionViewProps } from 'components/Sections/SectionsTypes'
import { SectionHeader } from 'components/Sections/SectionHeader'

export const GroupedSectionView = ({
  sections
}: GroupedSectionViewProps): JSX.Element => {
  const [menuState, setMenuState] = useState(false)
  const anchorRef = React.useRef(null)
  const toggleMenu = (): void => setMenuState(!menuState)

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
              onClick={(onClickEvent: React.MouseEvent): void =>
                onClickEvent.stopPropagation()
              }
              className="scale-hover u-c-pointer"
            >
              <SquareAppIcon
                name={section.name}
                IconContent={
                  <Grid container spacing={0}>
                    {section.items.slice(0, 4).map(item => {
                      const icon = item.attributes.metadata.icon ?? ''
                      const iconMimeType = item.attributes.metadata.iconMimeType

                      return (
                        <Grid item xs={6} key={item.id}>
                          <img
                            src={
                              iconMimeType
                                ? `data:${iconMimeType};base64,${icon}`
                                : `data:image/svg+xml;base64,${window.btoa(
                                    icon
                                  )}`
                            }
                            alt={item.attributes.name}
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
    </div>
  )
}
