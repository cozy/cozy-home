import React from 'react'
import { useNavigate } from 'react-router-dom'

import SquareAppIcon from 'cozy-ui/transpiled/react/SquareAppIcon'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import SectionAppGroup from 'components/Sections/SectionAppGroup'
import { get4FirstItems } from 'components/Sections/utils'
import { GroupedSectionTileProps } from 'components/Sections/SectionsTypes'

const GroupedSectionTile = ({
  section
}: GroupedSectionTileProps): JSX.Element | null => {
  const navigate = useNavigate()
  const { t } = useI18n()

  const handleNavigation = (
    name: string,
    type: 'konnectors' | 'shortcuts'
  ): void => {
    navigate(`categories/${type}/${name}`)
  }

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
        IconContent={<SectionAppGroup items={get4FirstItems(section)} />}
        variant={section.pristine ? 'ghost' : 'normal'}
        style={{
          alignItems: 'flex-start',
          justifyContent: 'flex-start'
        }}
      />
    </a>
  )
}

export default GroupedSectionTile
