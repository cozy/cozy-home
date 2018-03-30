import * as fromCozyClient from 'redux-cozy-client'

const APPS_KEY = 'apps'

export const fetchApps = () => fromCozyClient.fetchApps(APPS_KEY)
