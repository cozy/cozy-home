/**
 * Returns the source URL or data for a given wallpaper.
 *
 * @param {Object} wallpaper - The wallpaper object.
 * @param {string} defaultWallpaper - The URL or path for the default wallpaper.
 * @param {string|undefined} binaryCustomWallpaper - The custom wallpaper as a base64 string or URL (if applicable).
 * @returns {string} - The resolved wallpaper image source (URL, base64 data, etc).
 */
export const getWallpaperSrc = (
  wallpaper,
  defaultWallpaper,
  binaryCustomWallpaper
) => {
  if (wallpaper.role === 'default') {
    return defaultWallpaper
  }
  if (wallpaper.role === 'import' && binaryCustomWallpaper) {
    return binaryCustomWallpaper
  }
  return '/assets/backgrounds/' + wallpaper.image
}

/**
 * Returns the alt text for a given wallpaper image.
 *
 * @param {Object} wallpaper - The wallpaper object.
 * @param {Function} t - Translation function.
 * @returns {string} The alt text for the wallpaper.
 */
export const getWallpaperAlt = (wallpaper, t) => {
  return wallpaper.role === 'import' ? t('wallpaper.import') : wallpaper.label
}

/**
 * Returns the label text for a given wallpaper.
 *
 * @param {Object} wallpaper - The wallpaper object.
 * @param {Function} t - Translation function.
 * @returns {string} The label text for the wallpaper.
 */
export const getWallpaperLabel = (wallpaper, t) => {
  return wallpaper.role === 'import' ? t('wallpaper.import') : wallpaper.label
}

/**
 * Returns the current wallpaper key based on wallpaperLink.
 *
 * @param {string} wallpaperLink - The wallpaper link.
 * @param {Array} wallpapers - The wallpapers array.
 * @returns {string} The current wallpaper key.
 */
export const getCurrentWallpaperKey = (wallpaperLink, wallpapers) => {
  if (!wallpaperLink) {
    return 'bg_twp_default'
  }

  const imageName = wallpaperLink.split('/').pop()
  const wallpaper = wallpapers.find(wp => wp.image === imageName)

  return wallpaper ? wallpaper.key : 'bg_custom'
}
