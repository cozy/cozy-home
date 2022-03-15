module.exports = {
  globDirectory: 'build/',
  globPatterns: ['**/*.{css,js,html,png,svg}'],
  swDest: 'build/service-worker.js',
  swSrc: 'build/serviceWorker/service-worker/home.js',
  // the generated vendors.home is sized to 5 MB.
  // That is bigger than 2 MB default value of workbox InjectManifestOptions' maximumFileSizeToCacheInBytes:
  // https://developer.chrome.com/docs/workbox/reference/workbox-build/#type-WebpackInjectManifestOptions
  maximumFileSizeToCacheInBytes: 10 * 1024 * 1024
}
