module.exports = {
  globals: {
    __ALLOW_HTTP__: false,
    __TARGET__: 'browser',
    __SENTRY_TOKEN__: 'token',
    cozy: {}
  },
  moduleDirectories: ['src', 'node_modules'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'styl'],
  moduleNameMapper: {
    '^lib/redux-cozy-client$': '<rootDir>/src/lib/redux-cozy-client',
    '\\.(png|gif|jpe?g|svg|css)$': '<rootDir>/test/__mocks__/fileMock.js',
    '.styl$': 'identity-obj-proxy',
    '^cozy-client$': 'cozy-client/dist/index',
    '^test(.*)': '<rootDir>/test/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/test/jestLib/setup.js'],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://cozy.localhost:8080/'
  },
  transform: {
    '^.+\\.(ts|tsx|js|jsx)?$': 'babel-jest'
  },
  transformIgnorePatterns: [
    'node_modules/(?!cozy-ui|cozy-harvest-lib|cozy-keys-lib|cozy-sharing|react-swipeable-views-core|copy-text-to-clipboard)'
  ]
}
