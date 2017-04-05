import 'babel-polyfill'
/** @jsx h */
import { h, render } from 'preact'
import { Router, Route, Redirect, hashHistory } from 'react-router'

import { I18n } from './plugins/preact-polyglot'
import MyAccountsStore, { Provider } from './lib/MyAccountsStore'

import App from './components/App'
import DiscoveryList from './components/DiscoveryList'
import CategoryList from './components/CategoryList'
import ConnectedList from './components/ConnectedList'
import ConnectorManagement from './containers/ConnectorManagement'
import UseCaseDialog from './components/UseCaseDialog'

import './styles/index.styl'

const lang = document.documentElement.getAttribute('lang') || 'en'
const context = window.context || 'cozy'

// store
window.initKonnectors = require('./initKonnectors.json')
window.initFolders = require('./initFolders.json')

const store = new MyAccountsStore(window.initKonnectors, window.initFolders, context)
const categories = store.getCategories()
const useCases = store.getUseCases()

render((
  <Provider store={store}>
    <I18n context={context} locale={lang}>
      <Router history={hashHistory}>
        <Route
          component={(props) =>
            <App categories={categories} {...props}
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
              path=':useCase/:account'
              component={(props) =>
                <div class='multi-dialogs-wrapper'>
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
            <Route path=':account' component={ConnectorManagement} />
          </Route>
          <Route
            path='/connected'
            component={(props) =>
              <ConnectedList connectors={store.findConnected()} {...props} />}
          >
            <Route path=':account' component={ConnectorManagement} />
          </Route>
        </Route>
      </Router>
    </I18n>
  </Provider>
), document.querySelector('[role=application]'))
