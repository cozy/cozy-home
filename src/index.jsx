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

document.addEventListener('DOMContentLoaded', () => {
  handleOAuthResponse()

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
              component={props => (
                <ConnectedList connectors={store.findConnected()} {...props} />
              )}
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
