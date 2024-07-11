import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import SquareAppIcon from 'cozy-ui/transpiled/react/SquareAppIcon'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import SectionAppGroup from 'components/Sections/SectionAppGroup'
import { GroupedSectionViewProps } from 'components/Sections/SectionsTypes'
import { SectionHeader } from 'components/Sections/SectionHeader'
import { get4FirstItems } from 'components/Sections/utils'
import AddServiceTile from 'components/AddServiceTile'

export const GroupedSectionView = ({
  sections
}: GroupedSectionViewProps): JSX.Element => {
  const [menuState, setMenuState] = useState(false)
  const anchorRef = useRef(null)
  const toggleMenu = (): void => setMenuState(!menuState)
  const { t } = useI18n()
  const navigate = useNavigate()
  const handleNavigation = (
    name: string,
    type: 'konnectors' | 'shortcuts'
  ): void => {
    navigate(`categories/${type}/${name}`)
  }
  const isServicesView = sections.find(section => section.type === 'category')

  return (
    <div className="shortcuts-list-wrapper u-m-auto u-w-100">
      <SectionHeader
        anchorRef={anchorRef}
        toggleMenu={toggleMenu}
        menuState={menuState}
      />

      <div className="shortcuts-list u-w-100 u-mv-3 u-mv-2-t u-mh-auto u-flex-justify-center">
        {sections.map(section => {
          // We add a failsafe in the view to avoid rendering an empty section
          // This case appeared in prod environment but wasn't expected to be possible
          if (section.items.length === 0) return null

          return (
            <a
              key={section.id}
              onClick={(): void =>
                handleNavigation(
                  section.id,
                  section.type === 'category' ? 'konnectors' : 'shortcuts'
                )
              }
              className="scale-hover u-c-pointer"
            >
              <SquareAppIcon
                name={
                  section.type === 'category'
                    ? t(`category.${section.name}`)
                    : section.name
                }
                IconContent={
                  <SectionAppGroup items={get4FirstItems(section)} />
                }
                variant={section.pristine ? 'ghost' : 'normal'}
                style={{
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start'
                }}
              />
            </a>
          )
        })}

        {isServicesView && <AddServiceTile label={t('add_service')} />}
      </div>
    </div>
  )
}
