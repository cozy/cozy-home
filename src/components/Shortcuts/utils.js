export const formatShortcuts = (folders, shortcuts) =>
  folders
    .map(folder => ({
      name: folder.attributes.name,
      shortcuts: shortcuts.filter(
        shortcut => shortcut.attributes.dir_id === folder._id
      )
    }))
    .filter(folder => folder.shortcuts.length > 0)
