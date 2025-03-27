import React, { useState, useRef } from 'react'
import cx from 'classnames'

import { useQuery } from 'cozy-client'
import type { IOCozyKonnector } from 'cozy-client/types/types'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import { isTwakeTheme } from 'cozy-ui/transpiled/react/helpers/isTwakeTheme'

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
import { useSections } from './SectionsContext'
import CandidateServiceTile from 'components/CandidateServiceTile'
import { makeTriggersWithJobStatusQuery } from 'queries'

export const SectionBody = ({ section }: SectionViewProps): JSX.Element => {
  const { isMobile } = useBreakpoints()
  const currentDisplayMode = computeDisplayMode(isMobile, section)
  const isGroupMode = computeGroupMode(isMobile, section) === GroupMode.GROUPED
  const { t } = useI18n()
  const shouldOpenStoreModal = section.type === 'category' && section.pristine
  const { isRunning, isInMaintenance } = useSections()

  // This query is useful to fetch the triggers' current_state, used to display
  // the konnector icon. The data is fetched from the store in KonnectorTile
  useQuery(
    makeTriggersWithJobStatusQuery.definition(),
    makeTriggersWithJobStatusQuery.options
  )

  return (
    <div
      className={cx(
        'shortcuts-list u-w-100',
        {
          'u-mv-3 u-mv-2-t u-mh-auto u-flex-justify-center': !isGroupMode,
          'shortcuts-list--gutter': isTwakeTheme()
        },
        { detailed: currentDisplayMode === DisplayMode.DETAILED }
      )}
    >
      {(section.items as IOCozyKonnector[]).map((item, index) => {
        if (item._type === 'io.cozy.apps.suggestions') {
          return <CandidateServiceTile key={item.slug} konnector={item} />
        } else if (item.type === 'konnector') {
          return (
            <KonnectorTile
              shouldOpenStore={shouldOpenStoreModal}
              key={item.slug}
              konnector={item}
              isInMaintenance={isInMaintenance(item.slug)}
              loading={isRunning(item.slug)}
            />
          )
        } else {
          return (
            <ShortcutLink
              key={index}
              file={item}
              display={currentDisplayMode}
            />
          )
        }
      })}

      {!shouldOpenStoreModal && section.type === 'category' && (
        <AddServiceTile label={t('add_service')} category={section.name} />
      )}
    </div>
  )
}

export const SectionView = ({ section }: SectionViewProps): JSX.Element => {
  const [menuState, setMenuState] = useState(false)
  const anchorRef = useRef(null)
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
