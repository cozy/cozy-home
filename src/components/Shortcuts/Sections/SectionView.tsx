import React, { useState } from 'react'
import cx from 'classnames'

import SquareAppIcon from 'cozy-ui/transpiled/react/SquareAppIcon'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { useQuery } from 'cozy-client'

import flags from 'components/Shortcuts/Sections/flags.json' // TODO: to be fetched from cozy-flags
import { fetchSectionItems } from 'components/Shortcuts/Sections/SectionQueries'
import {
  DisplayMode,
  Section,
  SectionItem,
  SectionViewProps
} from 'components/Shortcuts/Sections/SectionsTypes'
import { SectionHeader } from 'components/Shortcuts/Sections/SectionHeader'

const useSectionDisplayMode = (
  section: Section
): [DisplayMode, React.Dispatch<React.SetStateAction<DisplayMode>>] => {
  const { isMobile } = useBreakpoints()
  const initialDisplayMode = section[isMobile ? 'mobile' : 'desktop']
    .detailed_lines
    ? DisplayMode.DETAILED
    : DisplayMode.COMPACT
  return useState(initialDisplayMode)
}

const useSectionItems = (sectionId: string): SectionItem[] | undefined => {
  const { data } = useQuery(
    fetchSectionItems(sectionId).query,
    fetchSectionItems(sectionId)
  ) as { data?: SectionItem[] }
  return data
}

export const SectionView = ({ section }: SectionViewProps): JSX.Element => {
  const [display, setDisplay] = useSectionDisplayMode(section)
  const [menuState, setMenuState] = useState(false)
  const anchorRef = React.useRef(null)
  const toggleMenu = (): void => setMenuState(!menuState)
  const handleAction = (action: DisplayMode): void =>
    void (action !== display && setDisplay(action))
  const data = useSectionItems(section.id)

  return (
    <div className="shortcuts-list-wrapper u-m-auto u-w-100">
      <SectionHeader
        sectionName={section.originalName}
        showMore={flags.showMore}
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
        {data?.map((item, index) => (
          <SquareAppIcon
            key={index}
            display={display}
            name={item.name}
            description={item.description}
          />
        ))}
      </div>
    </div>
  )
}
