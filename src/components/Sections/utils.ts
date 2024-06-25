import type { IOCozyFile, IOCozyKonnector } from 'cozy-client/types/types'

import {
  DisplayMode,
  GroupMode,
  Section,
  SectionSetting
} from 'components/Sections/SectionsTypes'

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
  folder: Section,
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

// Formats the provided folders into grouped and ungrouped sections
// Uses the provided layout settings to determine the display mode for each section
// If no layout is provided, uses the default layout
export const formatSections = (
  folders?: Section[],
  layout?: SectionSetting[] | SectionSetting,
  isMobile?: boolean
): { groupedSections: Section[]; ungroupedSections: Section[] } => {
  const fallback = { groupedSections: [], ungroupedSections: [] }
  if (!folders) return fallback

  // Create a new variable to hold the processed layout
  const processedLayout = !layout
    ? []
    : Array.isArray(layout)
    ? layout
    : [layout]

  // Handle the case where no layout is provided or layout is an empty array
  // Return folders sorted alphabetically by name, using the default layout
  if (processedLayout.length === 0) {
    return {
      ungroupedSections: folders
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(folder => ({
          id: folder.id,
          name: folder.name,
          items: folder.items,
          layout: _defaultLayout
        })),
      groupedSections: []
    }
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

  return { ungroupedSections, groupedSections }
}

export const handleSectionAction = (
  section: Section,
  isMobile: boolean,
  displayOrGroupMode: DisplayMode | GroupMode,
  values: { shortcutsLayout?: SectionSetting[] },
  save: (newValues: { shortcutsLayout: SectionSetting[] }) => void
): void => {
  const isDisplayMode =
    displayOrGroupMode === DisplayMode.DETAILED ||
    displayOrGroupMode === DisplayMode.COMPACT
  const sectionToSave: SectionSetting = {
    ...section.layout,
    [isMobile ? 'mobile' : 'desktop']: {
      ...section.layout[isMobile ? 'mobile' : 'desktop'],
      ...(isDisplayMode
        ? { detailedLines: displayOrGroupMode === DisplayMode.DETAILED }
        : { grouped: displayOrGroupMode === GroupMode.GROUPED })
    },
    id: section.id
  }

  const fetchedLayout = values.shortcutsLayout ?? []

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

// Used when building the grouped view of a section (4 small icons into 1 big icon)
export const get4FirstItems = (
  section: Section
): IOCozyFile[] | IOCozyKonnector[] => section.items.slice(0, 4)
