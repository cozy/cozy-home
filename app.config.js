const configs = [
  require('cozy-scripts/config/webpack.bundle.preact'),
  require('cozy-scripts/config/webpack.config.css-modules'),
  require('./config/webpack.config.cozy-home.js')
]

module.exports = configs
