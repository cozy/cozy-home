import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import {
  QueryDefinition,
  useAppsInMaintenance,
  useClient,
  useQuery,
  useSettings
} from 'cozy-client'
import {
  IOCozyAccount,
  IOCozyApp,
  IOCozyKonnector,
  IOCozyTrigger,
  QueryState
} from 'cozy-client/types/types'
import keyBy from 'lodash/keyBy'
import { sortBy } from 'lodash'

import {
  Section,
  SectionsContextValue,
  SectionSetting
} from 'components/Sections/SectionsTypes'
import { formatSections } from 'components/Sections/utils'
import {
  fetchRunningKonnectors,
  getRunningKonnectors
} from 'lib/konnectors_typed'
import { useMagicFolder } from 'components/Sections/hooks/useMagicFolder'
import { useShortcutsDirectories } from 'components/Sections/hooks/useShortcutsDirectories'
import {
  konnectorsConn,
  makeAccountsQuery,
  makeTriggersQuery,
  suggestedKonnectorsConn
} from 'queries'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import { fetchAllKonnectors } from './queries/konnectors'
import { formatServicesSections } from './lib/formatServicesSections'

const _makeTriggersQuery = makeTriggersQuery as {
  definition: () => QueryDefinition
  options: Record<string, unknown>
}

const _makeAccountsQuery = makeAccountsQuery as {
  definition: () => QueryDefinition
  options: Record<string, unknown>
}

// Create a context
const SectionsContext = createContext<SectionsContextValue>({
  konnectorsByCategory: [],
  shortcutsDirectories: [],
  ungroupedSections: [],
  groupedSections: [],
  displayTutorialTip: false,
  isRunning: () => false,
  isSuggested: () => false,
  isInMaintenance: () => false
})

interface SectionsProviderProps {
  children: React.ReactNode
}

// Create a provider component
export const SectionsProvider = ({
  children
}: SectionsProviderProps): JSX.Element => {
  const magicHomeFolderId = useMagicFolder()
  const shortcutsDirectories = useShortcutsDirectories(magicHomeFolderId)
  const { values } = useSettings('home', ['shortcutsLayout'])
  const shortcutsLayout = values?.shortcutsLayout as SectionSetting
  const { isMobile } = useBreakpoints()
  const client = useClient()
  const { t } = useI18n()

  const { data: allTriggers } = useQuery(
    _makeTriggersQuery.definition(),
    _makeTriggersQuery.options
  ) as { data: IOCozyTrigger[] }

  const { data: accounts } = useQuery(
    _makeAccountsQuery.definition(),
    _makeAccountsQuery.options
  ) as { data: IOCozyAccount[] }

  const { data: konnectors } = useQuery(
    konnectorsConn.query,
    konnectorsConn
  ) as { data: IOCozyKonnector[] }

  const appsAndKonnectorsInMaintenance =
    useAppsInMaintenance() as unknown as IOCozyApp[]

  const installedKonnectors = useMemo(
    () => sortBy(konnectors, konnector => konnector.name.toLowerCase()),
    [konnectors]
  )

  const suggestedKonnectorsQuery = useQuery(
    suggestedKonnectorsConn.query,
    suggestedKonnectorsConn
  ) as { data: IOCozyKonnector[] }

  const candidatesSlugBlacklist = useMemo(
    () =>
      appsAndKonnectorsInMaintenance
        .map(({ slug }) => slug)
        .concat(installedKonnectors.map(({ slug }) => slug)),
    [appsAndKonnectorsInMaintenance, installedKonnectors]
  )

  const suggestedKonnectors = useMemo(() => {
    return suggestedKonnectorsQuery.data
      ? suggestedKonnectorsQuery.data.filter(
          ({ slug }) => !candidatesSlugBlacklist.includes(slug)
        )
      : []
  }, [suggestedKonnectorsQuery.data, candidatesSlugBlacklist])

  const [groupedData, setGroupedData] =
    useState<{ [key: string]: IOCozyKonnector[] }>()

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      if (!client) return
      const grouped = await fetchAllKonnectors(client)
      setGroupedData(grouped)
    }
    void fetchData()
  }, [client])

  const sortedData = useCallback(
    (): Section[] =>
      groupedData
        ? formatServicesSections(
            groupedData,
            installedKonnectors,
            suggestedKonnectors,
            appsAndKonnectorsInMaintenance,
            t,
            allTriggers,
            accounts
          )
        : [],
    [
      groupedData,
      installedKonnectors,
      suggestedKonnectors,
      appsAndKonnectorsInMaintenance,
      t,
      allTriggers,
      accounts
    ]
  )

  const konnectorsByCategory = sortedData()
  const { ungroupedSections, groupedSections } = formatSections(
    shortcutsDirectories,
    shortcutsLayout,
    isMobile
  )

  const appsAndKonnectorsInMaintenanceBySlug = keyBy(
    appsAndKonnectorsInMaintenance,
    'slug'
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
        isSuggested: (slug: string): boolean =>
          suggestedKonnectors.some(konnector => konnector.slug === slug),
        isRunning: (slug: string): boolean => runningKonnectors.includes(slug),
        isInMaintenance: (slug: string): boolean =>
          Boolean(appsAndKonnectorsInMaintenanceBySlug[slug])
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
