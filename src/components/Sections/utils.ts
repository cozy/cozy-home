import { Section } from 'components/Sections/SectionsTypes'
import { DirectoryDataArray, FileData } from 'components/Shortcuts/types'

const defaultLayout: Section['layout'] = {
  mobile: {
    detailedLine: false,
    grouped: false
  },
  desktop: {
    detailedLine: false,
    grouped: false
  },
  order: 0,
  originalName: '',
  createdByApp: ''
}

export const formatSections = (
  folders: DirectoryDataArray,
  layout: Section[]
): Section[] => {
  const sectionsMap = layout.reduce((map, section) => {
    map[section.id] = section
    return map
  }, {} as { [key: string]: Section })

  const mergedMap = folders.map(folder => {
    const sectionLayout = sectionsMap[folder.id] || {}

    return {
      id: folder.id,
      name: folder.name,
      items: folder.items as FileData[],
      layout: {
        ...defaultLayout,
        ...sectionLayout
      }
    }
  })

  return mergedMap ?? []
}
