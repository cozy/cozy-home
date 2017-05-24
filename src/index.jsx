/* global __PIWIK_TRACKER_URL__ __PIWIK_SITEID__ __PIWIK_DIMENSION_ID_APP__ */
 /* global cozy Piwik */
import 'babel-polyfill'
import 'url-search-params-polyfill'
/* global cozy */
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Redirect, hashHistory } from 'react-router'

import { I18n } from './plugins/i18n'
import CollectStore, { Provider } from './lib/CollectStore'

import App from './containers/App'
import DiscoveryList from './components/DiscoveryList'
import CategoryList from './components/CategoryList'
import ConnectedList from './components/ConnectedList'
import ConnectorManagement from './containers/ConnectorManagement'
import UseCaseDialog from './components/UseCaseDialog'

import './styles/index.styl'

const lang = document.documentElement.getAttribute('lang') || 'en'
const context = window.context || 'cozy'

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('[role=application]')
  const data = root.dataset
  cozy.client.init({
    cozyURL: '//' + data.cozyDomain,
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
  window.initKonnectors = require('./initKonnectors.json')
  window.initFolders = require('./initFolders.json')

  const store = new CollectStore(window.initKonnectors, window.initFolders, context)
  const useCases = store.getUseCases()

  let history = hashHistory
  try {
    var PiwikReactRouter = require('piwik-react-router')
    const piwikTracker = (Piwik.getTracker(), PiwikReactRouter({
      url: __PIWIK_TRACKER_URL__,
      siteId: __PIWIK_SITEID__,
      injectScript: false
    }))
    piwikTracker.push(['enableHeartBeatTimer'])
    let userId = data.cozyDomain
    let indexOfPort = userId.indexOf(':')
    if (indexOfPort >= 0) userId = userId.substring(0, indexOfPort)
    piwikTracker.push(['setUserId', userId])
    piwikTracker.push(['setCustomDimension', __PIWIK_DIMENSION_ID_APP__, data.cozyAppName])

    history = piwikTracker.connectToHistory(hashHistory)
  } catch (err) {}

  render((
    <Provider store={store}>
      <I18n context={context} lang={lang}>
        <Router history={history}>
          <Route
            component={(props) =>
              <App {...props}
              />}
          >
            <Redirect from='/' to='/discovery' />
            <Route
              path='/discovery'
              component={(props) =>
                <DiscoveryList
                  useCases={useCases} context={context} {...props}
                />}
            >
              <Route
                path=':useCase'
                component={(props) =>
                  <UseCaseDialog
                    item={useCases.find(u => u.slug === props.params.useCase)}
                    connectors={store.findByUseCase(props.params.useCase)}
                    context={context}
                    {...props}
                  />}
              />
              <Route
                path=':useCase/:connectorSlug'
                component={(props) =>
                  <div className='multi-dialogs-wrapper'>
                    <UseCaseDialog
                      item={useCases.find(u => u.slug === props.params.useCase)}
                      connectors={store.findByUseCase(props.params.useCase)}
                      context={context}
                      {...props}
                    />
                    <ConnectorManagement {...props} />
                  </div>}
              />
            </Route>
            <Redirect from='/category' to='/category/all' />
            <Route
              path='/category/:filter'
              component={(props) =>
                <CategoryList
                  category={props.params.filter}
                  connectors={store.findByCategory(props.params)} {...props}
                />}
            >
              <Route
                path=':connectorSlug'
                component={ConnectorManagement}
              />
            </Route>
            <Route
              path='/connected'
              component={(props) =>
                <ConnectedList connectors={store.findConnected()} {...props} />}
            >
              <Route path=':connectorSlug' component={ConnectorManagement} />
            </Route>
          </Route>
        </Router>
      </I18n>
    </Provider>
  ), document.querySelector('[role=application]'))
})
