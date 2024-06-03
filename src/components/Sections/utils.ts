import {
  DisplayMode,
  GroupMode,
  Section,
  SectionSetting
} from 'components/Sections/SectionsTypes'
import { DirectoryDataArray } from 'components/Shortcuts/types'

// Default layout configuration used when no specific layout is provided for a folder
export const _defaultLayout: Omit<SectionSetting, 'id'> = {
  mobile: {
    detailedLines: false,
    grouped: false
  },
  desktop: {
    detailedLines: false,
    grouped: false
  },
  order: Infinity, // This should be used only if no order is defined
  originalName: '',
  createdByApp: ''
}

// Creates a map of section settings by their ID for quick lookup
const createSectionsMap = (
  layout: SectionSetting[]
): { [key: string]: Omit<SectionSetting, 'id'> } => {
  return layout.reduce((map, { id, ...rest }) => {
    if (id) {
      map[id] = rest
    }
    return map
  }, {} as { [key: string]: Omit<SectionSetting, 'id'> })
}

// Merges a folder with its corresponding layout settings
// If no specific layout is provided, uses the default layout
const mergeFolderWithLayout = (
  folder: DirectoryDataArray[0],
  sectionsMap: { [key: string]: Omit<SectionSetting, 'id'> }
): Section => {
  const sectionLayout = sectionsMap[folder.id] || {}
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
}

// Sorts sections primarily by their 'order' property
// If two sections have the same order, sorts them alphabetically by their name
const sortSections = (sections: Section[]): Section[] => {
  return sections.sort((a, b) => {
    const orderA = a.layout.order
    const orderB = b.layout.order

    // If both sections have the same order, sort alphabetically by name
    if (orderA === orderB) {
      return a.name.localeCompare(b.name)
    }

    // Otherwise, sort by order
    return orderA - orderB
  })
}

// Main function to format sections based on provided folders and layout settings
// Returns a sorted list of sections, with each folder merged with its corresponding layout
// If no layout is provided, returns folders sorted alphabetically with the default layout
export const formatSections = (
  folders?: DirectoryDataArray,
  layout?: SectionSetting[] | SectionSetting,
  isMobile?: boolean
): [Section[], Section[]] => {
  if (!folders) return [[], []]

  // Create a new variable to hold the processed layout
  const processedLayout = !layout
    ? []
    : Array.isArray(layout)
    ? layout
    : [layout]

  // Handle the case where no layout is provided or layout is an empty array
  // Return folders sorted alphabetically by name, using the default layout
  if (processedLayout.length === 0) {
    return [
      folders
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(folder => ({
          id: folder.id,
          name: folder.name,
          items: folder.items,
          layout: _defaultLayout
        })),
      []
    ]
  }

  // Create a map of layout settings for quick lookup
  const sectionsMap = createSectionsMap(processedLayout)

  // Merge each folder with its corresponding layout settings
  const mergedMap: Section[] = folders.map(folder =>
    mergeFolderWithLayout(folder, sectionsMap)
  )

  // Sort the merged sections based on their order and name
  const sortedSections = sortSections(mergedMap)

  const groupedSections = sortedSections.filter(
    section => section.layout[isMobile ? 'mobile' : 'desktop'].grouped
  )

  const ungroupedSections = sortedSections.filter(
    section => !section.layout[isMobile ? 'mobile' : 'desktop'].grouped
  )

  return [ungroupedSections, groupedSections]
}

export const handleSectionAction = (
  section: Section,
  isMobile: boolean,
  displayMode: DisplayMode | GroupMode,
  values: { shortcutsLayout: SectionSetting[] },
  save: (newValues: { shortcutsLayout: SectionSetting[] }) => void
): void => {
  const sectionToSave: SectionSetting = {
    ...section.layout,
    [isMobile ? 'mobile' : 'desktop']: {
      ...section.layout[isMobile ? 'mobile' : 'desktop'],
      detailedLines: displayMode === DisplayMode.DETAILED
    },
    id: section.id
  }

  const fetchedLayout = values.shortcutsLayout

  save({
    shortcutsLayout: [
      ...fetchedLayout.filter(
        (sectionSetting: SectionSetting) =>
          sectionSetting.id !== sectionToSave.id
      ),
      sectionToSave
    ]
  })
}

export const computeDisplayMode = (
  isMobile: boolean,
  section: Section
): DisplayMode => {
  const layout = section.layout[isMobile ? 'mobile' : 'desktop']

  return layout.detailedLines ? DisplayMode.DETAILED : DisplayMode.COMPACT
}

export const computeGroupMode = (
  isMobile: boolean,
  section: Section
): GroupMode => {
  const layout = section.layout[isMobile ? 'mobile' : 'desktop']

  return layout.grouped ? GroupMode.GROUPED : GroupMode.DEFAULT
}
