import React, { useState } from 'react'
import cx from 'classnames'

import flag from 'cozy-flags'

import SquareAppIcon from 'cozy-ui/transpiled/react/SquareAppIcon'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'

import {
  DisplayMode,
  Section,
  SectionViewProps
} from 'components/Sections/SectionsTypes'
import { SectionHeader } from 'components/Sections/SectionHeader'

const useSectionDisplayMode = (
  section?: Section
): [DisplayMode, React.Dispatch<React.SetStateAction<DisplayMode>>] => {
  const { isMobile } = useBreakpoints()
  const initialDisplayMode = section?.layout?.[isMobile ? 'mobile' : 'desktop']
    ?.detailedLine
    ? DisplayMode.DETAILED
    : DisplayMode.COMPACT
  return useState(initialDisplayMode)
}

export const SectionView = ({ section }: SectionViewProps): JSX.Element => {
  const [display, setDisplay] = useSectionDisplayMode(section)
  const [menuState, setMenuState] = useState(false)
  const anchorRef = React.useRef(null)
  const toggleMenu = (): void => setMenuState(!menuState)
  const handleAction = (action: DisplayMode): void =>
    void (action !== display && setDisplay(action))

  return (
    <div className="shortcuts-list-wrapper u-m-auto u-w-100">
      <SectionHeader
        name={section.name}
        showMore={flag('home.showMore')}
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
