import React, { useState } from 'react'
import cx from 'classnames'

import type { IOCozyKonnector } from 'cozy-client/types/types'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import AddServiceTile from 'components/AddServiceTile'
import KonnectorTile from 'components/KonnectorTile'
import { SectionHeader } from 'components/Sections/SectionHeader'
import { ShortcutLink } from 'components/ShortcutLink'
import { computeDisplayMode, computeGroupMode } from 'components/Sections/utils'
import {
  DisplayMode,
  GroupMode,
  SectionViewProps
} from 'components/Sections/SectionsTypes'

export const SectionBody = ({ section }: SectionViewProps): JSX.Element => {
  const { isMobile } = useBreakpoints()
  const currentDisplayMode = computeDisplayMode(isMobile, section)
  const isGroupMode =
    (section && computeGroupMode(isMobile, section)) === GroupMode.GROUPED
  const { t } = useI18n()
  return (
    <div
      className={cx(
        'shortcuts-list u-w-100 ',
        {
          'u-mv-3 u-mv-2-t u-mh-auto u-flex-justify-center': !isGroupMode
        },
        { detailed: Boolean(currentDisplayMode === DisplayMode.DETAILED) }
      )}
    >
      {section.items.map((item, index) =>
        item.type === 'konnector' ? (
          <KonnectorTile
            key={(item as IOCozyKonnector).slug}
            konnector={item as IOCozyKonnector}
            isInMaintenance={false}
            loading={false}
          />
        ) : (
          <ShortcutLink key={index} file={item} display={currentDisplayMode} />
        )
      )}
      {section.type === 'category' && !section.pristine && (
        <AddServiceTile label={t('add_service')} category={section.name} />
      )}
    </div>
  )
}

export const SectionView = ({ section }: SectionViewProps): JSX.Element => {
  const [menuState, setMenuState] = useState(false)
  const anchorRef = React.useRef(null)
  const toggleMenu = (): void => setMenuState(!menuState)

  return (
    <div className="shortcuts-list-wrapper u-m-auto u-w-100">
      <SectionHeader
        section={section}
        anchorRef={anchorRef}
        toggleMenu={toggleMenu}
        menuState={menuState}
      />

      <SectionBody section={section} />
    </div>
  )
}
