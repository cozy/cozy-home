module.exports = {
  testURL: 'http://localhost/',
  moduleFileExtensions: ['js', 'jsx', 'json', 'styl'],
  setupFiles: ['<rootDir>/test/jestLib/setup.js'],
  moduleDirectories: ['src', 'node_modules'],
  moduleNameMapper: {
    '^redux-cozy-client$': '<rootDir>/src/lib/redux-cozy-client',
    '^cozy-doctypes$': 'cozy-logger/dist/index.js',
    '\\.(png|gif|jpe?g|svg)$': '<rootDir>/test/__mocks__/fileMock.js',
    // identity-obj-proxy module is installed by cozy-scripts
    styles: 'identity-obj-proxy'
  },
  transformIgnorePatterns: ['node_modules/(?!cozy-ui|cozy-harvest-lib)'],
  globals: {
    __ALLOW_HTTP__: false,
    __TARGET__: 'browser',
    __SENTRY_TOKEN__: 'token',
    cozy: {}
  }
}
