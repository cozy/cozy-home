/* global __DEVTOOLS__ */
import { compose, createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import CollectStore from '../lib/CollectStore'
import getReducers from '../reducers'

const configureStore = (initKonnectors, initFolders, context) => {
  // Enable Redux dev tools
  const composeEnhancers = (__DEVTOOLS__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

  const reduxStore = createStore(
    getReducers(),
    composeEnhancers(applyMiddleware.apply(this, [createLogger()]))
  )

  return Object.assign(new CollectStore(initKonnectors, initFolders, context), reduxStore)
}

export default configureStore
