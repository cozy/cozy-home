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
      '@babel/runtime': path.resolve(SRC_DIR, '../node_modules/@babel/runtime'),
      'cozy-device-helper': path.resolve(
        __dirname,
        '../node_modules/cozy-device-helper'
      ),
      'cozy-doctypes': path.resolve(SRC_DIR, '../node_modules/cozy-doctypes'),
      'cozy-logger': path.resolve(SRC_DIR, '../node_modules/cozy-logger'),
      'es-abstract': path.resolve(SRC_DIR, '../node_modules/es-abstract'),
      'has-symbols': path.resolve(SRC_DIR, '../node_modules/has-symbols'),
      'hoist-non-react-statics': path.resolve(
        SRC_DIR,
        '../node_modules/hoist-non-react-statics'
      ),
      inherits: path.resolve(SRC_DIR, '../node_modules/inherits'),
      'is-callable': path.resolve(SRC_DIR, '../node_modules/is-callable'),
      isarray: path.resolve(SRC_DIR, '../node_modules/isarray'),
      'node-forge': path.resolve(SRC_DIR, '../node_modules/node-forge'),
      'node-polyglot': path.resolve(SRC_DIR, '../node_modules/node-polyglot'),
      'object-assign': path.resolve(SRC_DIR, '../node_modules/object-assign'),
      'prop-types': path.resolve(SRC_DIR, '../node_modules/prop-types'),
      'react-is': path.resolve(SRC_DIR, '../node_modules/react-is'),
      'react-redux': path.resolve(SRC_DIR, '../node_modules/react-redux'),
      'react-swipeable-views': path.resolve(
        SRC_DIR,
        '../node_modules/react-swipeable-views'
      ),
      'react-swipeable-views-core': path.resolve(
        SRC_DIR,
        '../node_modules/react-swipeable-views-core'
      ),
      redux: path.resolve(SRC_DIR, '../node_modules/redux'),
      'unist-util-visit-parents': path.resolve(
        SRC_DIR,
        '../node_modules/unist-util-visit-parents'
      ),
      warning: path.resolve(SRC_DIR, '../node_modules/warning'),

      config: path.resolve(SRC_DIR, './config')
    }
  },
  plugins: [
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
    }),

    new webpack.DefinePlugin({
      __SIMULATE_FLAGSHIP__: false
    })
  ].filter(Boolean)
}
