'use strict'

const path = require('path')
const fs = require('fs')

const webpack = require('webpack')
const autoprefixer = require('autoprefixer')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const pkg = require(path.resolve(__dirname, 'package.json'))

// use the `OPTIMIZE` env to switch from dev to production build
const optimize = process.env.OPTIMIZE === 'true'

/**
 * Loaders used by webpack
 *
 * - CSS and images files from `vendor` are excluded
 * - stylesheets are optimized via cssnano, minus svgo and autoprefixer that are
 * customized via PostCSS
 * - images are cache-busted in production build
 */
const cssOptions = optimize ? 'css?-svgo&-autoprefixer&-mergeRules' : 'css'
const imgPath = 'img/' + '[name]' + (optimize ? '.[hash]' : '') + '.[ext]'

let loaders = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    query: {
      presets: [
        ['env', {
          'targets': {
            'chrome': 42,
            'browsers': ['last 2 versions']
          },
          'useBuiltIns': true
        }]
      ],
      plugins: [['transform-react-jsx', { 'pragma': 'h' }]]
    }
  },
  {
    test: /\.json$/,
    loader: 'json'
  },
  {
    test: /\.styl$/,
    loader: ExtractTextPlugin.extract('style', cssOptions + '!postcss-loader!stylus')
  },
  {
    test: /\.svg$/,
    include: /(sprites|icons)/,
    loader: 'svg-sprite?name=[name]_[hash]'
  },
  {
    test: /\.(png|gif|jpe?g|svg)$/i,
    exclude: /(vendor|sprites|icons)/,
    loader: 'file?name=' + imgPath
  }
]

/**
 * Configure Webpack's plugins to tweaks outputs:
 *
 * all builds:
 * - ExtractTextPlugin: output CSS to file instead of inlining it
 * - CopyPlugin: copy assets to public dir
 *
 * prod build:
 * - AssetsPlugin: paths to cache-busted's assets to read them from server
 * - DedupePlugin
 * - OccurenceOrderPlugin
 * - UglifyJsPlugin
 * - DefinePlugin: disable webpack env dev vars
 *
 * dev build:
 * - BrowserSyncPlugin: make hot reload via browsersync exposed at
 *   http://localhost:3000, proxified to the server app port
 */
let plugins = [
  new ExtractTextPlugin(optimize ? 'app.[hash].css' : 'app.css'),
  new CopyPlugin([
    { from: 'vendor/assets', ignore: ['.gitkeep'] }
  ]),
  new HtmlWebpackPlugin({
    template: 'app/index.ejs',
    title: pkg.name,
    inject: false,
    minify: {
      collapseWhitespace: true
    }
  })
]

if (optimize) {
  plugins = plugins.concat([
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      __SERVER__: JSON.stringify('http://app.cozy.local'),
      __DEVELOPMENT__: !optimize,
      __DEVTOOLS__: !optimize,
      __STACK_ASSETS__: false
    }),
    function () {
      this.plugin('done', function (stats) {
        fs.writeFileSync(
          path.join(__dirname, 'build', 'assets.json'),
          '{"hash":"' + stats.hash + '"}'
        )
      })
    }
  ])
} else {
  plugins = plugins.concat([
    new BrowserSyncPlugin({
      proxy: 'http://localhost:' + (process.env.PORT || 9358) + '/',
      open: false
    })
  ])
}

/**
 * Webpack config
 *
 * - output to `public` dir
 * - cache-bust assets when build for production
 */

module.exports = {
  entry: './app',
  output: {
    path: path.resolve('build'),
    filename: optimize ? 'app.[hash].js' : 'app.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    // so that npm linked libs can be found
    fallback: path.join(__dirname, 'node_modules'),
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat'
    }
  },
  resolveLoader: { fallback: path.join(__dirname, 'node_modules') },
  debug: !optimize,
  devtool: 'source-map',
  module: {
    loaders: loaders
  },
  plugins: plugins,
  postcss: function () {
    return [
      autoprefixer({
        browsers: [
          'last 2 versions'
        ]
      })
    ]
  },
  stylus: {
    use: [require('cozy-ui/stylus')()]
  }
}
