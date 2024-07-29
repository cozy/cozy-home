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

export const formatServicesSections = (
  data: { [key: string]: (IOCozyKonnector & { status?: string })[] },
  installedKonnectors: IOCozyKonnector[],
  suggestedKonnectors: IOCozyKonnector[],
  appsAndKonnectorsInMaintenance: IOCozyKonnector[],
  t: (key: string) => string,
  allTriggers: IOCozyTrigger[],
  accounts: IOCozyAccount[]
): Section[] => {
  // Create sets for fast lookup
  const installedKonnectorNames = new Set(installedKonnectors.map(k => k.name))
  const maintenanceSlugs = new Set(
    appsAndKonnectorsInMaintenance.map(k => k.slug)
  )

  // Map each category to a section
  const sections: Section[] = Object.keys(data).map(key => {
    const allItems = data[key] || []
    // Filter out items that are in maintenance
    const availableItems = allItems.filter(
      item => !maintenanceSlugs.has(item.slug)
    )
    // Filter items that are installed
    const installedItems = availableItems.filter(item =>
      installedKonnectorNames.has(item.name)
    )

    // Enhance suggestedKonnectors with names from availableItems only if they are in availableItems
    const suggestedKonnectorsWithName = suggestedKonnectors
      .map(k => ({
        ...k,
        name: availableItems.find(i => i.slug === k.slug)?.name || k.slug
      }))
      .filter(suggestedKonnector =>
        availableItems.some(
          availableItem => availableItem.slug === suggestedKonnector.slug
        )
      )

    // Determine the items to be sorted
    const itemsToSort =
      installedItems.length > 0
        ? [...installedItems, ...suggestedKonnectorsWithName]
        : availableItems

    // Sort the items
    const sortedItems = processAndSortItems(itemsToSort, allTriggers, accounts)

    // Construct the section
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

  // Filter and sort the sections
  return sections
    .filter(section =>
      shouldIncludeSection(section, config.categoriesWhitelist)
    )
    .sort((a, b) => sortSections(a, b, t))
}
