import { createStore } from 'redux'
import CollectStore from '../lib/CollectStore'
import getReducers from '../reducers'

const configureStore = (initKonnectors, initFolders, context) => {
  const reduxStore = createStore(getReducers())

  return Object.assign(new CollectStore(initKonnectors, initFolders, context), reduxStore)
}

export default configureStore
