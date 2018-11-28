'use strict'

const path = require('path')
const { DefinePlugin } = require('webpack')

const SRC_DIR = path.resolve(__dirname, '../src')

module.exports = {
  resolve: {
    alias: {
      config: path.resolve(SRC_DIR, './config'),
      'redux-cozy-client': path.resolve(SRC_DIR, './lib/redux-cozy-client')
    }
  },
  plugins: [
    new DefinePlugin({
      __PIWIK_SITEID__: 8,
      __PIWIK_DIMENSION_ID_APP__: 1,
      __PIWIK_TRACKER_URL__: JSON.stringify('https://piwik.cozycloud.cc')
    })
  ]
}
