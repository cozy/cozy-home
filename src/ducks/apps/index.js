import get from 'lodash/get'

// TODO use getDocumentFromState from cozy-client
const getDocumentFromState = (state, doctype, id) => {
  return get(state, `cozy.documents["${doctype}"]["${id}"]`)
}

const APP_DOCTYPE = 'io.cozy.apps'

// Selectors
export const getApp = (state, slug) => {
  const app =
    getDocumentFromState(state, APP_DOCTYPE, `${APP_DOCTYPE}/${slug}`) || null
  return app
}
