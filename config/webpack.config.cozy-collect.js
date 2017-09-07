'use strict'

const path = require('path')
const { ProvidePlugin } = require('webpack')

const SRC_DIR = path.resolve(__dirname, '../src')

module.exports = {
  resolve: {
    alias: {
      config: path.resolve(SRC_DIR, './config'),
      'redux-cozy-client': path.resolve(SRC_DIR, './lib/redux-cozy-client')
    }
  },
  plugins: [
    new ProvidePlugin({
      'initKonnectors': 'expose?initKonnectors!config/konnectors.json',
      'initFolders': 'expose?intFolders!config/folders.json'
    })
  ]
}
