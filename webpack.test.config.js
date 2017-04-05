'use strict'

const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')

const ExtractTextPlugin = require('extract-text-webpack-plugin')

const plugins = []
const TRAVIS = process.env.TRAVIS ? JSON.parse(process.env.TRAVIS) : false

if (TRAVIS) {
  console.log('TRAVIS mode (will fail on error)')
  plugins.push(new webpack.NoErrorsPlugin())
}

plugins.push(new ExtractTextPlugin('app.css'))

module.exports = {
  entry: './app',

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

  debug: true,

  devtool: 'source-map',

  bail: TRAVIS,

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: [['transform-react-jsx', { 'pragma': 'h' }]]
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss-loader!stylus')
      },
      {
        test: /\.svg$/,
        include: /sprites/,
        loader: 'svg-sprite?name=[name]_[hash]'
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/i,
        exclude: /(vendor|sprites)/,
        loader: 'file?name=img/[name].[ext]'
      }
    ]
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
    use: [require('cozy-ui/lib/stylus')()]
  }
}
