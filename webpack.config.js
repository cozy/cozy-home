'use strict'

const path = require('path')

const autoprefixer = require('autoprefixer')

const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const pkg = require(path.resolve(__dirname, 'package.json'))

const merge = require('webpack-merge')
const { production, extractor } = require('./config/webpack.vars')
// use the `OPTIMIZE` env to switch from dev to production build
const optimize = process.env.NODE_ENV === production

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
    exclude: /(node_modules|cozy-(bar|client-js))/,
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
    loader: extractor.extract('style', cssOptions + '!postcss-loader!stylus')
  },
  {
    test: /\.svg$/,
    include: /(sprites|icons)/,
    loader: 'svg-sprite?' + JSON.stringify({
      name: '[name]_[hash]',
      spriteModule: path.join(__dirname, 'config/csp-proof-sprite')
    })
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
  extractor,
  new CopyPlugin([
    { from: 'vendor/assets', ignore: ['.gitkeep'] }
  ]),
  new HtmlWebpackPlugin({
    template: 'app/index.ejs',
    title: pkg.name,
    inject: false,
    excludeChunks: ['services'],
    minify: {
      collapseWhitespace: true
    }
  }),
  new HtmlWebpackPlugin({
    template: 'app/services.ejs',
    title: `${pkg.name} services`,
    filename: 'services/index.html',
    inject: false,
    chunks: ['services'],
    minify: {
      collapseWhitespace: true
    }
  })
]

/**
 * Webpack config
 *
 * - output to `public` dir
 * - cache-bust assets when build for production
 */

module.exports = merge(require('./config/webpack.config.base.js'), {
  entry: {
    app: './app',
    services: './app/services.jsx'
  },
  output: {
    path: path.resolve('build'),
    filename: optimize ? '[name].[hash].js' : '[name].js'
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
},
  require(production ? './config/webpack.config.prod' : './config/webpack.config.dev')
)
