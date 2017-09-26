'use strict'

const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  plugins: [
    new CopyPlugin([
      { from: 'vendor/assets', ignore: ['.gitkeep'] },
      { from: 'manifest.webapp' },
      { from: 'scripts/publish_registry.sh' }
    ])
  ]
}
