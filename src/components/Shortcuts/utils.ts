import sectionsjson from 'components/Sections/sections.json' // TODO: to be fetched from home settings
import { Section } from 'components/Sections/SectionsTypes'
import { DirectoryDataArray, FileDataArray } from './types'

export const formatShortcuts = (
  folders: DirectoryDataArray,
  shortcuts: FileDataArray
): Section[] | undefined => {
  // folder null is when the query is not done yet
  if (folders === null) return undefined
  // if folders is empty, we return an empty array because
  // we can't have shortcuts without folders
  if (folders.length === 0) return []

  // shortcuts null is when the query for the shortcut is not done yet
  // and since we already checked that folders is not null, we can return undefined
  // because it means that the query for shortcuts is not done yet
  if (shortcuts === null) return undefined

  // Create a map from the sections JSON for quick lookups
  const sectionsMap = sectionsjson.reduce((map, section) => {
    map[section.id] = section
    return map
  }, {} as { [key: string]: Section['layout'] })

  const mergedMap = folders
    .map(folder => {
      const sectionLayout = sectionsMap[folder.id] || {}

      return {
        id: folder.id,
        name: folder.attributes.name,
        items: shortcuts.filter(
          shortcut => shortcut.attributes.dir_id === folder.id
        ),
        layout: {
          ...sectionLayout
        }
      }
    })
    .filter(folder => folder.items.length > 0)

  return mergedMap
}
