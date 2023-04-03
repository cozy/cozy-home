import { compose, createStore, applyMiddleware } from 'redux'
import { cozyMiddleware } from 'lib/redux-cozy-client'
import { createLogger } from 'redux-logger'
import konnectorsI18nMiddleware from 'lib/middlewares/konnectorsI18n'
import thunkMiddleware from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import { isFlagshipApp } from 'cozy-device-helper'

import HomeStore from 'lib/HomeStore'
import flag from 'cozy-flags'
import getReducers from 'reducers'

const persistConfig = {
  key: 'root',
  storage
}

const configureWithPersistor = (
  legacyClient,
  cozyClient,
  context,
  options = {}
) => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const persistedReducer = persistReducer(
    persistConfig,
    getReducers(cozyClient)
  )
  const reduxStore = createStore(
    persistedReducer,
    composeEnhancers(
      applyMiddleware.apply(
        this,
        [
          cozyMiddleware(legacyClient),
          konnectorsI18nMiddleware(options.lang),
          thunkMiddleware,
          flag('redux-logger') ? createLogger() : null
        ].filter(Boolean)
      )
    )
  )
  let persistor = persistStore(reduxStore)
  return {
    store: Object.assign(
      new HomeStore(context, cozyClient, options),
      reduxStore
    ),
    persistor
  }
}

const configureDefault = (legacyClient, cozyClient, context, options) => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const reduxStore = createStore(
    getReducers(cozyClient),
    composeEnhancers(
      applyMiddleware.apply(
        this,
        [
          cozyMiddleware(legacyClient),
          konnectorsI18nMiddleware(options.lang),
          thunkMiddleware,
          flag('redux-logger') ? createLogger() : null
        ].filter(Boolean)
      )
    )
  )

  return {
    store: Object.assign(
      new HomeStore(context, cozyClient, options),
      reduxStore
    )
  }
}

const configureStore = (legacyClient, cozyClient, context, options = {}) => {
  return isFlagshipApp() || flag('home.store.persist')
    ? configureWithPersistor(legacyClient, cozyClient, context, options)
    : configureDefault(legacyClient, cozyClient, context, options)
}

export default configureStore
