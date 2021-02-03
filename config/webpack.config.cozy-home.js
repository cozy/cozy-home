'use strict'

const webpack = require('webpack')
const path = require('path')
const { environment } = require('cozy-scripts/config/webpack.vars')
const { DefinePlugin, ContextReplacementPlugin } = require('webpack')
const IgnoreNotFoundExportPlugin = require('ignore-not-found-export-webpack-plugin')

const SRC_DIR = path.resolve(__dirname, '../src')

// See https://github.com/date-fns/date-fns/blob/master/docs/webpack.md
const supportedLocales = ['en', 'fr', 'es']
const regexpMomentDateFnsLocales = new RegExp(
  `/(${supportedLocales.join('|')})/index.js`
)
const regexpAppLocales = new RegExp(`/(${supportedLocales.join('|')}).json`)

module.exports = {
  resolve: {
    modules: [SRC_DIR, 'node_modules'],
    alias: {
      config: path.resolve(SRC_DIR, './config')
    }
  },
  plugins: [
    environment === 'development'
      ? new webpack.ProvidePlugin({
          'cozy.client': 'cozy-client-js/dist/cozy-client.js',
          'cozy.bar': 'cozy-bar/dist/cozy-bar.js'
        })
      : null,

    new DefinePlugin({
      __PIWIK_SITEID__: 8,
      __PIWIK_DIMENSION_ID_APP__: 1,
      __PIWIK_TRACKER_URL__: JSON.stringify('https://piwik.cozycloud.cc')
    }),
    new ContextReplacementPlugin(
      /moment[/\\]locale$/,
      regexpMomentDateFnsLocales
    ),
    new ContextReplacementPlugin(
      /date-fns[/\\]locale$/,
      regexpMomentDateFnsLocales
    ),
    new ContextReplacementPlugin(/src[/\\]locales/, regexpAppLocales),

    /**
     * There are several exports that have been removed from @bitwarden/jslib
     * and we do not want false positives warnings about those missing exports
     * since we do not use the functions that need them.
     *
     * Here we specify files for which it is OK to have a missing import.
     */
    new IgnoreNotFoundExportPlugin({
      include: [
        /@bitwarden\/jslib\/services\/crypto\.service/, // EEFLongWordList
        /@bitwarden\/jslib\/services\/passwordGeneration\.service/, // EEFLongWordList
        /WebVaultClient/, // EEFLongWordList
        /cozy-ui\/transpiled\/react\/Portal\/index\.js/ // preact-portal
      ]
    })
  ].filter(Boolean)
}
