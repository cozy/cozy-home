import {
  IOCozyKonnector,
  IOCozyTrigger,
  IOCozyAccount
} from 'cozy-client/types/types'

import {
  STATUS,
  getAccountsFromTrigger,
  getTriggersBySlug
} from 'components/KonnectorHelpers'
import { Section } from 'components/Sections/SectionsTypes'

// List of categories that are allowed to be included even if pristine
const categoriesWhitelist = [
  'banking',
  'clouds',
  'isp',
  'energy',
  'public_service'
]

// Helper functions
const isItemInMaintenance = (
  maintenanceSlugs: Set<string>,
  item: IOCozyKonnector
): boolean => !maintenanceSlugs.has(item.slug)

const getItemStatus = (accountsForKonnector: IOCozyAccount[]): number =>
  accountsForKonnector && accountsForKonnector.length > 0
    ? STATUS.OK
    : STATUS.NO_ACCOUNT

const sortItemsByStatusAndName = (
  a: IOCozyKonnector & { status?: number },
  b: IOCozyKonnector & { status?: number }
): number => {
  if (a.status === STATUS.OK && b.status !== STATUS.OK) return -1
  if (a.status !== STATUS.OK && b.status === STATUS.OK) return 1
  if (a.status === STATUS.NO_ACCOUNT && b.status !== STATUS.NO_ACCOUNT)
    return -1
  if (a.status !== STATUS.NO_ACCOUNT && b.status === STATUS.NO_ACCOUNT) return 1
  return a.name.localeCompare(b.name)
}

const shouldIncludeSection = (section: Section, whitelist: string[]): boolean =>
  whitelist.includes(section.name) || !section.pristine

const sortSections = (
  a: Section,
  b: Section,
  t: (key: string) => string
): number => {
  if (!a.pristine && b.pristine) return -1
  if (a.pristine && !b.pristine) return 1
  return t(`category.${a.name}`).localeCompare(t(`category.${b.name}`))
}

// New helper function for processing and sorting items within a category
const processAndSortItems = (
  items: IOCozyKonnector[],
  allTriggers: Record<string, IOCozyTrigger>,
  accounts: { [key: string]: IOCozyAccount }
): IOCozyKonnector[] => {
  return items
    .map(item => {
      const triggers = getTriggersBySlug(
        allTriggers as { trigger: IOCozyTrigger },
        item.slug
      )
      const accountsForKonnector = getAccountsFromTrigger(accounts, triggers)
      return {
        ...item,
        status: getItemStatus(accountsForKonnector)
      }
    })
    .sort(sortItemsByStatusAndName)
}

// Main transformation function
export const formatServicesSections = (
  data: { [key: string]: (IOCozyKonnector & { status?: string })[] },
  installedKonnectors: IOCozyKonnector[],
  suggestedKonnectors: IOCozyKonnector[],
  appsAndKonnectorsInMaintenance: IOCozyKonnector[],
  t: (key: string) => string,
  allTriggers: Record<string, IOCozyTrigger>,
  accounts: { [key: string]: IOCozyAccount }
): Section[] => {
  const installedKonnectorNames = new Set(installedKonnectors.map(k => k.name))
  const maintenanceSlugs = new Set(
    appsAndKonnectorsInMaintenance.map(k => k.slug)
  )

  const sections: Section[] = Object.keys(data).map(key => {
    const allItems = data[key] || []
    const availableItems = allItems.filter(item =>
      isItemInMaintenance(maintenanceSlugs, item)
    )
    const installedItems = availableItems.filter(item =>
      installedKonnectorNames.has(item.name)
    )
    const suggestedItems = availableItems.filter(item =>
      suggestedKonnectors.some(k => k.slug === item.slug)
    )
    const itemsToSort =
      installedItems.length > 0
        ? [...installedItems, ...suggestedItems]
        : availableItems

    const sortedItems = processAndSortItems(itemsToSort, allTriggers, accounts)

    return {
      name: key,
      items: sortedItems,
      id: key,
      type: 'category',
      layout: {
        originalName: key,
        createdByApp: '',
        mobile: { detailedLines: false, grouped: true },
        desktop: { detailedLines: false, grouped: true },
        order: 0
      },
      pristine: installedItems.length === 0
    }
  })

  return sections
    .filter(section => shouldIncludeSection(section, categoriesWhitelist))
    .sort((a, b) => sortSections(a, b, t))
}
