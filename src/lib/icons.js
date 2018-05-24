// Fallback to get the item icon and avoid error if not found
// with a possible default icon

export const getKonnectorIcon = konnector => {
  let icon = null
  if (konnector.icon) {
    try {
      // See https://stackoverflow.com/questions/7650587/using-javascript-to-display-blob
      var urlCreator = window && (window.URL || window.webkitURL)
      return urlCreator.createObjectURL(konnector.icon)
    } catch (error) {
      console.warn(
        `Cannot create icon url for konnector ${konnector.slug} (${
          error.message
        })`
      )
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
