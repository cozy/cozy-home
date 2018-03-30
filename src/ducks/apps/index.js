import * as fromCozyClient from 'redux-cozy-client'

const APPS_DOCTYPE = 'io.cozy.apps'
const APPS_KEY = 'apps'

export const fetchApps = () => fromCozyClient.fetchApps(APPS_KEY)

// selectors
const getApp = (state, slug) =>
  state &&
  state.documents &&
  state.documents[APPS_DOCTYPE] &&
  state.documents[APPS_DOCTYPE][`${APPS_DOCTYPE}/${slug}`]

export const getAppUrl = (state, slug) => {
  const app = getApp(state, slug)
  return app && app.links && app.links.related
}
