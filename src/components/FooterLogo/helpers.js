export const getHomeLogos = (data, rootURL) => {
  if (data) {
    const logos = data?.attributes?.home_logos || {}
    return Object.keys(logos).reduce((acc, logoSrc) => {
      acc[`${rootURL}/assets${logoSrc}`] = logos[logoSrc]
      return acc
    }, {})
  }

  return {}
}
