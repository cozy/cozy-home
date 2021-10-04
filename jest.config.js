module.exports = {
  testURL: 'http://localhost/',
  moduleFileExtensions: ['js', 'jsx', 'json', 'styl'],
  setupFiles: ['<rootDir>/test/jestLib/setup.js'],
  moduleDirectories: ['src', 'node_modules'],
  moduleNameMapper: {
    '^lib/redux-cozy-client$': '<rootDir>/src/lib/redux-cozy-client',
    '\\.(png|gif|jpe?g|svg|css)$': '<rootDir>/test/__mocks__/fileMock.js',
    // identity-obj-proxy module is installed by cozy-scripts
    '.styl$': 'identity-obj-proxy',
    '^cozy-client$': 'cozy-client/dist/index'
  },
  transformIgnorePatterns: [
    'node_modules/(?!cozy-ui|cozy-harvest-lib|cozy-keys-lib|cozy-sharing|react-swipeable-views-core)'
  ],
  globals: {
    __ALLOW_HTTP__: false,
    __TARGET__: 'browser',
    __SENTRY_TOKEN__: 'token',
    cozy: {}
  }
}
