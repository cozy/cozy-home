import CozyClient from 'cozy-client'
import memoize from 'lodash/memoize'
import { CozyClient as LegacyCozyClient } from 'lib/redux-cozy-client'
import flag from 'cozy-flags'

import configureStore from 'store/configureStore'
import schema from './schema'
import homeConfig from 'config/home.json'

/**
 * Setups clients and store
 *
 * Is memoized to avoid several clients in case of hot-reload
 */
export const setupAppContext = memoize(() => {
  const lang = document.documentElement.getAttribute('lang') || 'en'
  const context = window.context || 'cozy'
  const root = document.querySelector('[role=application]')
  const data = root.dataset

  // New improvements must be done with CozyClient
  const cozyClient = new CozyClient({
    uri: `${window.location.protocol}//${data.cozyDomain}`,
    schema,
    token: data.cozyToken
  })

  cozyClient.registerPlugin(flag.plugin)

  const legacyClient = new LegacyCozyClient({
    cozyURL: `//${data.cozyDomain}`,
    token: data.cozyToken,
    cozyClient
  })

  // store
  const store = configureStore(legacyClient, cozyClient, context, {
    lang,
    ...homeConfig
  })

  return { cozyClient, store, data, lang, context }
})
