export const getHomeLogos = (data, rootURL) => {
  if (data) {
    const logos = data?.attributes?.home_logos || {}
    return Object.keys(logos).reduce((acc, logoSrc) => {
      const filename = logoSrc.substring(logoSrc.lastIndexOf('/') + 1)
      const logo = {
        url: `${rootURL}/assets${logoSrc}`,
        alt: logos[logoSrc]
      }
      if (filename.startsWith('main_')) {
        acc['main'] = logo
      } else {
        acc['secondaries'] = acc['secondaries'] || {}
        acc['secondaries'][logo.url] = logo.alt
      }
      return acc
    }, {})
  }

  return {}
}
