// Fallback to get the item icon and avoid error if not found
// with a possible default icon

export const getKonnectorIcon = (konnector) => {
  if (konnector.icon) {
    return require(`../assets/icons/konnectors/${konnector.icon}`)
  }
  const slug = konnector.slug
  let icon = ''
  const extensions = ['.svg', '.png', '.gif', '.jpg']
  for (const ext of extensions) {
    try {
      icon = require(`../assets/icons/konnectors/${slug}${ext}`)
      break
    } catch (e) {}
  }
  if (!icon) {
    icon = require('../assets/icons/konnectors/default.svg')
  }
  return icon
}
