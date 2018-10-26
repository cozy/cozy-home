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
      // eslint-disable-next-line no-console
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
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e.message)
    }
  }
  if (!icon) {
    icon = require('../assets/konnectors/default.svg')
  }
  return icon
}

export const fetchIcon = cozyClient => async url => {
  let icon
  try {
    const resp = await cozyClient.fetch('GET', url)
    if (!resp.ok)
      throw new Error(`Error while fetching icon ${resp.statusText}: ${url}`)
    icon = await resp.blob()
  } catch (error) {
    throw error
  }
  const mimeType = icon.type
  if (mimeType && mimeType.match(/^image\/.*$/)) {
    return URL.createObjectURL(icon)
  }
  throw new Error(`App icon ${url} is not an image.`)
}
