/* global cozy, initKonnectors, initFolders, __DEBUG__ */
import 'babel-polyfill'
import 'url-search-params-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Redirect, hashHistory } from 'react-router'
import { CozyClient, CozyProvider } from 'redux-cozy-client'

import { I18n } from 'cozy-ui/react/I18n'
import { shouldEnableTracking, getTracker } from 'cozy-ui/react/helpers/tracker'

import App from './containers/App'
import collectConfig from './config/collect'
import configureStore from './store/configureStore'
import CategoryList from './components/CategoryList'
import ConnectedList from './components/ConnectedList'
import ConnectorManagement from './containers/ConnectorManagement'

import './styles/index.styl'

const lang = document.documentElement.getAttribute('lang') || 'en'
const context = window.context || 'cozy'

const handleOAuthResponse = () => {
  /* global URLSearchParams */
  const queryParams = new URLSearchParams(window.location.search)
  if (queryParams.get('account')) {
    const opener = window.opener

    // TODO : this is a hack. Why not remove this and add a route "redirect" with accountId ?
    if (opener == null) {
      return { account: queryParams.get('account') }
    }

    const accountKey = queryParams.get('account')
    const targetOrigin =
      window.location.origin ||
      `${window.location.protocol}//${window.location.hostname}${window.location
        .port
        ? ':' + window.location.port
        : ''}`
    opener.postMessage(
      {
        key: accountKey,
        origin: window.name
      },
      targetOrigin
    )
    window.close()
  }
}

// TODO : this is a hack. Why not remove this and add a route "redirect" with accountId ?
function runKonnectorFromAccountId(accountId, client, store) {
  let account
  return client
    .fetchDocument('io.cozy.accounts', accountId)
    .then(accounts => {
      account = accounts.data[0]
      return store.fetchKonnectorInfos(account.account_type)
    })
    .then(konnector => {
      return store.runAccount(konnector, account, true, 0)
    })
    .then(() => account)
}

document.addEventListener('DOMContentLoaded', () => {
  const oauthRedirectParams = handleOAuthResponse()

  const root = document.querySelector('[role=application]')
  const data = root.dataset

  const client = new CozyClient({
    cozyURL: `//${data.cozyDomain}`,
    token: data.cozyToken
  })

  cozy.bar.init({
    appEditor: data.cozyAppEditor,
    appName: data.cozyAppName,
    iconPath: data.cozyIconPath,
    lang: data.cozyLocale,
    replaceTitleOnMobile: true
  })

  // store
  const store = configureStore(client, initKonnectors, initFolders, context, {
    ...collectConfig,
    debug: __DEBUG__
  })

  // TODO : this is a hack. Why not remove this and add a route "redirect" with accountId ?
  if (oauthRedirectParams) {
    return runKonnectorFromAccountId(
      oauthRedirectParams.account,
      client,
      store
    ).then(account => {
      document.location = `/#/providers/all/${account.account_type}`
    })
  }

  let history = hashHistory

  if (shouldEnableTracking() && getTracker()) {
    let trackerInstance = getTracker()
    history = trackerInstance.connectToHistory(hashHistory)
    trackerInstance.track(hashHistory.getCurrentLocation()) // when using a hash history, the initial visit is not tracked by piwik react router
  }

  const dictRequire = lang => require(`./locales/${lang}`)

  render(
    <CozyProvider store={store} client={client}>
      <I18n lang={lang} dictRequire={dictRequire} context={context}>
        <Router history={history}>
          <Route
            component={props => (
              <App
                domain={data.cozyDomain}
                initKonnectors={initKonnectors}
                {...collectConfig}
                {...props}
              />
            )}
          >
            <Redirect from="/" to="/connected" />
            <Route
              path="/connected"
              component={props => <ConnectedList {...props} />}
            >
              <Route path=":connectorSlug" component={ConnectorManagement} />
            </Route>
            <Redirect from="/providers" to="/providers/all" />
            <Route
              path="/providers/:filter"
              component={props => (
                <CategoryList
                  category={props.params.filter}
                  categories={store.categories}
                  connectors={store.findByCategory(props.params.filter)}
                  {...props}
                />
              )}
            >
              <Route path=":connectorSlug" component={ConnectorManagement} />
            </Route>
          </Route>
          <Redirect from="*" to="/connected" />
        </Router>
      </I18n>
    </CozyProvider>,
    document.querySelector('[role=application]')
  )
})
