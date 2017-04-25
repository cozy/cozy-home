'use strict'

const PostCSSAssetsPlugin = require('postcss-assets-webpack-plugin')

const { production, extractor } = require('./webpack.vars')

module.exports = {
  devtool: '#source-map',
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: extractor.extract('style', [
          'css-loader?importLoaders=1',
          'postcss-loader'
        ])
      }
    ]
  },
  plugins: [
    extractor,
    new PostCSSAssetsPlugin({
      test: /\.css$/,
      plugins: [
        require('css-mqpacker'),
        require('postcss-discard-duplicates'),
        require('postcss-discard-empty')
      ].concat(
        production ? require('csswring')({preservehacks: true, removeallcomments: true}) : []
      )
    })
  ]
}
