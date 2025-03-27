import React, { useRef, useState } from 'react'
import cx from 'classnames'

import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import { isTwakeTheme } from 'cozy-ui/transpiled/react/helpers/isTwakeTheme'

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

      <div
        className={cx(
          'shortcuts-list u-w-100 u-mh-auto u-flex-justify-center',
          {
            'shortcuts-list--gutter': isTwakeTheme(),
            'u-mv-3 u-mv-2-t ': !isTwakeTheme()
          }
        )}
      >
        {sections.map(section => (
          <GroupedSectionTile key={section.id} section={section} />
        ))}

        {isServicesView && <AddServiceTile label={t('add_service')} />}
      </div>
    </div>
  )
}
