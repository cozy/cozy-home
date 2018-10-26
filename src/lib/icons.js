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
