const {
  environment,
  target,
  addAnalyzer
} = require('cozy-scripts/config/webpack.vars')

const configs = [
  require('cozy-scripts/config/webpack.config.base'),
  require('cozy-scripts/config/webpack.config.preact'),
  require('cozy-scripts/config/webpack.config.cozy-ui'),
  require('cozy-scripts/config/webpack.config.cozy-ui.react'),
  require('cozy-scripts/config/webpack.config.intents'),
  require('cozy-scripts/config/webpack.config.pictures'),
  require('cozy-scripts/config/webpack.config.vendors'),
  require('cozy-scripts/config/webpack.config.manifest'),
  require('cozy-scripts/config/webpack.config.progress'),
  addAnalyzer ? require('cozy-scripts/config/webpack.config.analyzer') : {},
  require(`cozy-scripts/config/webpack.target.${target}`),
  require('cozy-scripts/config/webpack.config.css-modules.js'),
  require('./config/webpack.config.cozy-home.js')
]

if (environment === 'production') {
  configs.push(require('cozy-scripts/config/webpack.environment.prod'))
} else {
  configs.push(require('cozy-scripts/config/webpack.environment.dev'))
}

module.exports = configs
