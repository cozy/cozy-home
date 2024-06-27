import React, { createContext, useContext } from 'react'

import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import { useQuery, useSettings } from 'cozy-client'

import { Section, SectionSetting } from 'components/Sections/SectionsTypes'
import { formatSections } from 'components/Sections/utils'
import { formatShortcuts } from 'components/Shortcuts/utils'
import { useKonnectorsByCat } from 'components/Sections/hooks/useKonnectorsByCat'
import {
  mkHomeMagicFolderConn,
  mkHomeCustomShorcutsConn,
  mkHomeCustomShorcutsDirConn
} from 'queries'

interface SectionsContextValue {
  konnectorsByCategory: Section[]
  shortcutsDirectories: Section[]
  ungroupedSections: Section[]
  groupedSections: Section[]
  displayTutorialTip: boolean
}

// Create a context
const SectionsContext = createContext<SectionsContextValue>({
  konnectorsByCategory: [],
  shortcutsDirectories: [],
  ungroupedSections: [],
  groupedSections: [],
  displayTutorialTip: false
})

interface SectionsProviderProps {
  children: JSX.Element
}

// Create a provider component
export const SectionsProvider = ({
  children
}: SectionsProviderProps): JSX.Element => {
  const { t } = useI18n()

  const homeMagicFolderConn = mkHomeMagicFolderConn(t)
  const { data: magicFolder } = useQuery(
    homeMagicFolderConn.query,
    homeMagicFolderConn
  ) as { data: { _id: string }[] }
  const magicHomeFolderId = magicFolder?.[0]?._id

  const homeShortcutsDirConn = mkHomeCustomShorcutsDirConn({
    currentFolderId: magicHomeFolderId
  })
  const canHaveShortcuts = !!magicHomeFolderId
  const { data: folders } = useQuery(homeShortcutsDirConn.query, {
    ...homeShortcutsDirConn.options,
    enabled: canHaveShortcuts
  }) as { data: { _id: string }[] }
  const customHomeShortcutsConn = mkHomeCustomShorcutsConn(
    folders && folders.map(folder => folder._id)
  )
  const { data: customHomeShortcuts } = useQuery(
    customHomeShortcutsConn.query,
    {
      ...customHomeShortcutsConn,
      enabled: Boolean(folders && folders.length > 0)
    }
  )
  const shortcutsDirectories = canHaveShortcuts
    ? (formatShortcuts(folders, customHomeShortcuts) as Section[])
    : []

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

  return (
    <SectionsContext.Provider
      value={{
        konnectorsByCategory: konnectorsByCategory,
        shortcutsDirectories,
        ungroupedSections,
        groupedSections,
        displayTutorialTip: areAllCategoriesPristine
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
