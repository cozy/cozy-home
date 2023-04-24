const configs = [
  require('cozy-scripts/config/webpack.bundle.default'),
  require('cozy-scripts/config/webpack.config.css-modules'),
  require('./config/webpack.config.cozy-home.js')
]

const extraConfig = {
  resolve: {
    alias: {
      'react-pdf$': 'react-pdf/dist/esm/entry.webpack'
    }
  }
}
configs.push(extraConfig)
module.exports = configs
