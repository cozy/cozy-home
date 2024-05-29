import React, { useState } from 'react'
import cx from 'classnames'

import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'

import {
  DisplayMode,
  SectionViewProps
} from 'components/Sections/SectionsTypes'
import { SectionHeader } from 'components/Sections/SectionHeader'
import { ShortcutLink } from 'components/ShortcutLink'
import { computeDisplayMode } from 'components/Sections/utils'

export const SectionView = ({ section }: SectionViewProps): JSX.Element => {
  const [menuState, setMenuState] = useState(false)
  const anchorRef = React.useRef(null)
  const { isMobile } = useBreakpoints()
  const toggleMenu = (): void => setMenuState(!menuState)
  const currentDisplayMode = computeDisplayMode(isMobile, section)

  return (
    <div className="shortcuts-list-wrapper u-m-auto u-w-100">
      <SectionHeader
        section={section}
        anchorRef={anchorRef}
        toggleMenu={toggleMenu}
        menuState={menuState}
      />

      <div
        className={cx(
          'shortcuts-list u-w-100 u-mv-3 u-mv-2-t u-mh-auto u-flex-justify-center',
          { detailed: Boolean(currentDisplayMode === DisplayMode.DETAILED) }
        )}
      >
        {section.items.map((item, index) => (
          <ShortcutLink key={index} file={item} display={currentDisplayMode} />
        ))}
      </div>
    </div>
  )
}
