export const formatShortcuts = (folders, shortcuts) => {
  // folder null is when the query is not done yet
  if (folders === null) return undefined
  // if folders is empty, we return an empty array because
  // we can't have shortcuts without folders
  if (folders.length === 0) return []

  // shortcuts null is when the query for the shortcut is not done yet
  // and since we already checked that folders is not null, we can return undefined
  // because it means that the query for shortcuts is not done yet
  if (shortcuts === null) return undefined
  return folders
    .map(folder => ({
      id: folder._id,
      name: folder.attributes.name,
      items: shortcuts.filter(
        shortcut => shortcut.attributes.dir_id === folder._id
      )
    }))
    .filter(folder => folder.items.length > 0)
}
