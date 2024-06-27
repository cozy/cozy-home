// SectionsProvider.tsx
import React, { createContext, useContext, useMemo } from 'react'

import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import { useQuery, useSettings } from 'cozy-client'
import { QueryState } from 'cozy-client/types/types'

import {
  SectionsContextValue,
  SectionSetting
} from 'components/Sections/SectionsTypes'
import { formatSections } from 'components/Sections/utils'
import { useKonnectorsByCat } from 'components/Sections/hooks/useKonnectorsByCat'
import {
  fetchRunningKonnectors,
  getRunningKonnectors
} from 'lib/konnectors_typed'
import { useMagicFolder } from 'components/Sections/hooks/useMagicFolder'
import { useShortcutsDirectories } from 'components/Sections/hooks/useShortcutsDirectories'

// Create a context
const SectionsContext = createContext<SectionsContextValue>({
  konnectorsByCategory: [],
  shortcutsDirectories: [],
  ungroupedSections: [],
  groupedSections: [],
  displayTutorialTip: false,
  isRunning: () => false
})

interface SectionsProviderProps {
  children: React.ReactNode
}

// Create a provider component
export const SectionsProvider = ({
  children
}: SectionsProviderProps): JSX.Element => {
  const { t } = useI18n()
  const magicHomeFolderId = useMagicFolder(t)
  const shortcutsDirectories = useShortcutsDirectories(magicHomeFolderId)
  const { values } = useSettings('home', ['shortcutsLayout'])
  const shortcutsLayout = values?.shortcutsLayout as SectionSetting
  const { isMobile } = useBreakpoints()
  const konnectorsByCategory = useKonnectorsByCat()
  const { ungroupedSections, groupedSections } = formatSections(
    shortcutsDirectories,
    shortcutsLayout,
    isMobile
  )
  const areAllCategoriesPristine = konnectorsByCategory.every(
    category => category.pristine
  )
  const { data: jobData } = useQuery(
    fetchRunningKonnectors.definition,
    fetchRunningKonnectors.options
  ) as { data: QueryState['data'] }
  const runningKonnectors = useMemo(
    () => getRunningKonnectors(jobData),
    [jobData]
  )

  return (
    <SectionsContext.Provider
      value={{
        konnectorsByCategory,
        shortcutsDirectories,
        ungroupedSections,
        groupedSections,
        displayTutorialTip: areAllCategoriesPristine,
        isRunning: (slug: string): boolean => {
          return runningKonnectors.includes(slug)
        }
      }}
    >
      {children}
    </SectionsContext.Provider>
  )
}

// Custom hook to use the sections context
export const useSections = (): SectionsContextValue => {
  return useContext(SectionsContext)
}
