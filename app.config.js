module.exports = [
  require('cozy-scripts/config/webpack.bundle.default.js'),
  require('cozy-scripts/config/webpack.config.css-modules.js'),
  require('cozy-scripts/config/webpack.config.services.js'),
  require('./config/webpack.config.cozy-collect.js')
]
