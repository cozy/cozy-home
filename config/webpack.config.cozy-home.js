'use strict'

const path = require('path')
const { DefinePlugin, ContextReplacementPlugin } = require('webpack')

const SRC_DIR = path.resolve(__dirname, '../src')

// See https://github.com/date-fns/date-fns/blob/master/docs/webpack.md
const supportedLocales = ['en', 'fr', 'es']
const regexpLocales = new RegExp(`/(${supportedLocales.join('|')})`)

module.exports = {
  resolve: {
    alias: {
      config: path.resolve(SRC_DIR, './config'),
      'redux-cozy-client': path.resolve(SRC_DIR, './lib/redux-cozy-client'),
      'cozy-ui/react': 'cozy-ui/transpiled/react'
    }
  },
  plugins: [
    new DefinePlugin({
      __PIWIK_SITEID__: 8,
      __PIWIK_DIMENSION_ID_APP__: 1,
      __PIWIK_TRACKER_URL__: JSON.stringify('https://piwik.cozycloud.cc')
    }),
    new ContextReplacementPlugin(/moment[\/\\]locale$/, regexpLocales),
    new ContextReplacementPlugin(/date-fns[\/\\]locale$/, regexpLocales),
    new ContextReplacementPlugin(/src[\/\\]locales/, regexpLocales),
  ]
}
