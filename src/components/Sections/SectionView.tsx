import React, { useState } from 'react'
import cx from 'classnames'

import SquareAppIcon from 'cozy-ui/transpiled/react/SquareAppIcon'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'

import {
  DisplayMode,
  Section,
  SectionViewProps
} from 'components/Sections/SectionsTypes'
import { SectionHeader } from 'components/Sections/SectionHeader'

const computeDisplayMode = (
  isMobile: boolean,
  section: Section
): DisplayMode => {
  const layout = section.layout[isMobile ? 'mobile' : 'desktop']
  return layout.detailedLine ? DisplayMode.DETAILED : DisplayMode.COMPACT
}

export const SectionView = ({ section }: SectionViewProps): JSX.Element => {
  const [menuState, setMenuState] = useState(false)
  const anchorRef = React.useRef(null)
  const { isMobile } = useBreakpoints()
  const toggleMenu = (): void => setMenuState(!menuState)
  const display = computeDisplayMode(isMobile, section)
  const handleAction = (): void => {
    // noop for now, will be needed for switching display user side
  }

  return (
    <div className="shortcuts-list-wrapper u-m-auto u-w-100">
      <SectionHeader
        name={section.name}
        anchorRef={anchorRef}
        toggleMenu={toggleMenu}
        menuState={menuState}
        handleAction={handleAction}
      />
      <div
        className={cx(
          'shortcuts-list u-w-100 u-mv-3 u-mv-2-t u-mh-auto u-flex-justify-center',
          { detailed: display === DisplayMode.DETAILED }
        )}
      >
        {section.items.map((item, index) => (
          <SquareAppIcon
            key={index}
            display={display}
            name={item.name}
            description={item.metadata.description}
            variant="default"
          />
        ))}
      </div>
    </div>
  )
}
