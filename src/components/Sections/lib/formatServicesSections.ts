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
import config from 'components/Sections/config.json'

// Determine the status of an item based on associated accounts
const getItemStatus = (accountsForKonnector: IOCozyAccount[]): number =>
  accountsForKonnector && accountsForKonnector.length > 0
    ? STATUS.OK
    : STATUS.NO_ACCOUNT

// Sort items first by status, then by localized name
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

// Determine if a section should be included based on whitelist or if it's not pristine
const shouldIncludeSection = (section: Section, whitelist: string[]): boolean =>
  whitelist.includes(section.name) || !section.pristine

// Sort sections by whether they are pristine and by localized name
const sortSections = (
  a: Section,
  b: Section,
  t: (key: string) => string
): number => {
  if (!a.pristine && b.pristine) return -1
  if (a.pristine && !b.pristine) return 1
  return t(`category.${a.name}`).localeCompare(t(`category.${b.name}`))
}

// Process and sort items within a category based on their status and name
const processAndSortItems = (
  items: IOCozyKonnector[],
  allTriggers: IOCozyTrigger[],
  accounts: IOCozyAccount[]
): IOCozyKonnector[] => {
  return items
    .map(item => {
      const triggers = getTriggersBySlug(allTriggers, item.slug)
      const accountsForKonnector = getAccountsFromTrigger(accounts, triggers)
      return {
        ...item,
        status: getItemStatus(accountsForKonnector)
      }
    })
    .sort(sortItemsByStatusAndName)
}

// Enhance suggested konnectors with names from available items
// This is needed because the suggested konnectors only have slugs
// We need a name to be able to localeCompare and sort items
const getEnhancedSuggestedKonnectors = (
  suggestedKonnectors: IOCozyKonnector[],
  availableItems: IOCozyKonnector[]
): IOCozyKonnector[] => {
  const availableItemsMap = new Map(
    availableItems.map(item => [item.slug, item.name])
  )
  return suggestedKonnectors.reduce((acc, k) => {
    if (availableItemsMap.has(k.slug)) {
      acc.push({ ...k, name: availableItemsMap.get(k.slug) || k.slug })
    }
    return acc
  }, [] as IOCozyKonnector[])
}

/**
 * Formats the given data into sections for display.
 *
 * This function organizes konnectors into categorized sections, filtering out those in maintenance,
 * prioritizing installed konnectors, and including suggested konnectors where appropriate. It returns
 * a structured array of sections ready for display in the UI.
 *
 * Example of returned array:
 * [
 *   {
 *     name: 'public_service',
 *     items: [
 *       {
 *         name: 'Ameli',
 *         status: 1,
 *         slug: 'ameli',
 *         ...
 *       },
 *       {
 *         name: 'CAF',
 *         status: 2,
 *         slug: 'caf',
 *         ...
 *       }
 *     ],
 *     id: 'public_service',
 *     type: 'category',
 *     layout: {
 *       originalName: 'public_service',
 *       createdByApp: '',
 *       mobile: { detailedLines: false, grouped: true },
 *       desktop: { detailedLines: false, grouped: true },
 *       order: 0
 *     },
 *     pristine: false
 *   },
 *   ...
 * ]
 *
 * @param data - The raw data to be formatted into sections.
 * @param installedKonnectors - An array of konnectors that are installed.
 * @param suggestedKonnectors - An array of konnectors that are suggested.
 * @param appsAndKonnectorsInMaintenance - An array of konnectors and apps currently in maintenance.
 * @param t - A function for translating keys into localized strings.
 * @param allTriggers - An array of triggers associated with konnectors.
 * @param accounts - An array of accounts linked to konnectors.
 * @returns An array of formatted sections.
 */
export const formatServicesSections = (
  data: { [key: string]: (IOCozyKonnector & { status?: string })[] },
  installedKonnectors: IOCozyKonnector[],
  suggestedKonnectors: IOCozyKonnector[],
  appsAndKonnectorsInMaintenance: IOCozyKonnector[],
  t: (key: string) => string,
  allTriggers: IOCozyTrigger[],
  accounts: IOCozyAccount[]
): Section[] => {
  // Create sets for fast lookup of installed konnector names and maintenance slugs
  const installedKonnectorNames = new Set(installedKonnectors.map(k => k.name))
  const maintenanceSlugs = new Set(
    appsAndKonnectorsInMaintenance.map(k => k.slug)
  )

  // Functions to filter out items in maintenance and to check if items are installed
  const isAvailable = (item: IOCozyKonnector): boolean =>
    !maintenanceSlugs.has(item.slug)
  const isInstalled = (item: IOCozyKonnector): boolean =>
    installedKonnectorNames.has(item.name)

  return (
    Object.keys(data)
      .map(key => {
        const allItems = data[key] || []

        // Filter out items that are in maintenance
        const availableItems = allItems.filter(isAvailable)

        // Filter out items that are in maintenance but keep installed ones
        const availableOrInstalledItems = allItems.filter(
          item => isAvailable(item) || isInstalled(item)
        )

        // Filter out items that are installed
        const installedItems = availableOrInstalledItems.filter(isInstalled)

        // Get suggested konnectors that are also in available items, enhancing their names
        const suggestedKonnectorsWithName = getEnhancedSuggestedKonnectors(
          suggestedKonnectors,
          availableItems
        )

        // Determine the items to sort: prioritize installed items and add suggested ones if any, otherwise use all available items
        const itemsToSort =
          installedItems.length > 0
            ? [...installedItems, ...suggestedKonnectorsWithName]
            : availableItems

        // Sort the items based on triggers and accounts
        const sortedItems = processAndSortItems(
          itemsToSort,
          allTriggers,
          accounts
        )

        // Construct the section with sorted items and layout details
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
      // Filter sections based on a whitelist to include only desired categories
      .filter(section =>
        shouldIncludeSection(section, config.categoriesWhitelist)
      )
      // Sort the sections to maintain a consistent order
      .sort((a, b) => sortSections(a, b, t))
  )
}
