const eslintConfigCozyApp = require('eslint-config-cozy-app')

const applyAdditionalRules = (config, index) => {
  if (index === 0) {
    return {
      ...config,
      rules: {
        ...config.rules,
        'import/order': [
          ...config.rules['import/order'].map((rule, index) => {
            if (index === 1) {
              return {
                ...rule,
                pathGroups: [
                  ...rule.pathGroups,
                  {
                    pattern:
                      '{components/**,config/**,containers/**,hooks/**,lib/**,locales/**,queries,queries/**,styles/**,test/**}',
                    group: 'internal'
                  }
                ]
              }
            } else {
              return rule
            }
          })
        ]
      }
    }
  } else {
    return config
  }
}

module.exports = [
  ...eslintConfigCozyApp.map((config, index) =>
    applyAdditionalRules(config, index)
  )
]
