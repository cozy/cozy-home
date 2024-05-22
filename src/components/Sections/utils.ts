import { Section, SectionSetting } from 'components/Sections/SectionsTypes'
import { DirectoryDataArray } from 'components/Shortcuts/types'

export const _defaultLayout: Omit<SectionSetting, 'id'> = {
  mobile: {
    detailedLine: false,
    grouped: false
  },
  desktop: {
    detailedLine: false,
    grouped: false
  },
  order: Infinity, // This should be used only if no order is defined
  originalName: '',
  createdByApp: ''
}

export const formatSections = (
  folders?: DirectoryDataArray,
  layout?: SectionSetting[]
): Section[] => {
  if (!folders || !layout) return []

  const sectionsMap = layout.reduce((map, { id, ...rest }) => {
    if (id) {
      map[id] = rest
    }
    return map
  }, {} as { [key: string]: Omit<SectionSetting, 'id'> })

  const mergedMap: Section[] = folders.map(folder => {
    const sectionLayout = sectionsMap[folder.id] || {}

    // Merge layouts while keeping the defined order, defaulting to Infinity if not present
    const mergedLayout = {
      ..._defaultLayout,
      ...sectionLayout
    }

    return {
      id: folder.id,
      name: folder.name,
      items: folder.items,
      layout: mergedLayout
    }
  })

  // Sort the merged array based on the "order" property and name
  const sortedSections = mergedMap.sort((a, b) => {
    const orderA = a.layout.order
    const orderB = b.layout.order

    // If both sections have the same order, sort alphabetically by name
    if (orderA === orderB) {
      return a.name.localeCompare(b.name)
    }

    // Otherwise, sort by order
    return orderA - orderB
  })

  return sortedSections ?? []
}
