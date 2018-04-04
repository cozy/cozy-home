// Fallback to get the item icon and avoid error if not found
// with a possible default icon

export const getKonnectorIcon = konnector => {
  let icon = null
  if (konnector.icon) {
    try {
      icon = require(`../assets/konnectors/${konnector.icon}`)
    } catch (error) {
      console.warn(error)
    }
  }
  const slug = konnector.slug
  const extensions = ['.svg', '.png', '.gif', '.jpg']
  for (const ext of extensions) {
    try {
      icon = require(`../assets/konnectors/${slug}${ext}`)
      break
    } catch (e) {}
  }
  if (!icon) {
    icon = require('../assets/konnectors/default.svg')
  }
  return icon
}
