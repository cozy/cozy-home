// Fallback to get the item icon and avoid error if not found
// with a possible default icon

export const getKonnectorIcon = konnector => {
  if (konnector.icon) {
    return require(`../assets/konnectors/${konnector.icon}`)
  }
  const slug = konnector.slug
  let icon = ''
  const extensions = ['.svg', '.png', '.gif', '.jpg']
  for (const ext of extensions) {
    try {
      icon = require(`../assets/konnectors/${slug}${ext}`)
      break
    } catch (e) {} // eslint-disable-line
  }
  if (!icon) {
    icon = require('../assets/konnectors/default.svg')
  }
  return icon
}
