import { compose, createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { persistStore, persistReducer, createMigrate } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

// import { isFlagshipApp } from 'cozy-device-helper'

import flag from 'cozy-flags'
import getReducers from 'reducers'
const migrations = {
  0: () => {
    return {}
  },
  1: () => {
    return {}
  }
}

const persistConfig = {
  key: 'root',
  storage,
  version: 2,
  migrate: createMigrate(migrations, { debug: false })
}

const configureWithPersistor = cozyClient => {
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
        [thunkMiddleware, flag('redux-logger') ? createLogger() : null].filter(
          Boolean
        )
      )
    )
  )
  let persistor = persistStore(reduxStore)
  return {
    store: reduxStore,
    persistor
  }
}

const configureDefault = cozyClient => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const reduxStore = createStore(
    getReducers(cozyClient),
    composeEnhancers(
      applyMiddleware.apply(
        this,
        [thunkMiddleware, flag('redux-logger') ? createLogger() : null].filter(
          Boolean
        )
      )
    )
  )

  return {
    store: reduxStore
  }
}

const configureStore = cozyClient => {
  return /* isFlagshipApp() ||  */ flag('home.store.persist')
    ? configureWithPersistor(cozyClient)
    : configureDefault(cozyClient)
}

export default configureStore
