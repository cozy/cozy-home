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
import DiscoveryList from './components/DiscoveryList'
import CategoryList from './components/CategoryList'
import ConnectedList from './components/ConnectedList'
import ConnectorManagement from './containers/ConnectorManagement'
import UseCaseDialog from './components/UseCaseDialog'

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
  const useCases = store.getUseCases()

  let history = hashHistory

  if (shouldEnableTracking() && getTracker()) {
    let trackerInstance = getTracker()
    history = trackerInstance.connectToHistory(hashHistory)
    trackerInstance.track(hashHistory.getCurrentLocation()) // when using a hash history, the initial visit is not tracked by piwik react router
  }

  const dictRequire = (lang, context) =>
    context
      ? require(`./contexts/${context}/locales/${lang}`)
      : require(`./locales/${lang}`)

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
            <Redirect from="/" to="/discovery" />
            <Route
              path="/discovery"
              component={props => (
                <DiscoveryList
                  useCases={useCases}
                  context={context}
                  {...props}
                />
              )}
            >
              <Route
                path=":useCase"
                component={props => (
                  <UseCaseDialog
                    item={useCases.find(u => u.slug === props.params.useCase)}
                    connectors={store.findByUseCase(props.params.useCase)}
                    context={context}
                    {...props}
                  />
                )}
              />
              <Route
                path=":useCase/:connectorSlug"
                component={props => (
                  <div className="multi-dialogs-wrapper">
                    <UseCaseDialog
                      item={useCases.find(u => u.slug === props.params.useCase)}
                      connectors={store.findByUseCase(props.params.useCase)}
                      context={context}
                      {...props}
                    />
                    <ConnectorManagement {...props} />
                  </div>
                )}
              />
            </Route>
            <Redirect from="/category" to="/category/all" />
            <Route
              path="/category/:filter"
              component={props => (
                <CategoryList
                  category={props.params.filter}
                  connectors={store.findByCategory(props.params)}
                  {...props}
                />
              )}
            >
              <Route path=":connectorSlug" component={ConnectorManagement} />
            </Route>
            <Route
              path="/connected"
              component={props => (
                <ConnectedList connectors={store.findConnected()} {...props} />
              )}
            >
              <Route path=":connectorSlug" component={ConnectorManagement} />
            </Route>
          </Route>
        </Router>
      </I18n>
    </CozyProvider>,
    document.querySelector('[role=application]')
  )
})
