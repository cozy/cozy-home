export const DOCTYPE = 'io.cozy.konnectors'

const getKonnectorsFromState = state => {
  return !!state && !!state.documents && state.documents[DOCTYPE]
}

// Selectors
export const getKonnector = (state, slug) => {
  const konnectors = getKonnectorsFromState(state)
  return konnectors && konnectors[`${DOCTYPE}/${slug}`]
}

export const getSlugs = state => {
  const konnectors = getKonnectorsFromState(state)
  return konnectors
    ? Object.values(konnectors).map(konnector => konnector.slug)
    : []
}
