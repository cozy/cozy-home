'use strict'

const path = require('path')
const { ProvidePlugin } = require('webpack')

module.exports = {
  resolve: {
    alias: {
      config: path.resolve(__dirname, '../src/config')
    }
  },
  plugins: [
    new ProvidePlugin({
      'initKonnectors': 'expose?initKonnectors!config/konnectors.json',
      'initFolders': 'expose?intFolders!config/folders.json'
    })
  ]
}
