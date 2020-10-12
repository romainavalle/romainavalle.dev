importScripts('https://cdn.jsdelivr.net/npm/workbox-cdn@4.0.0-rc.2/workbox/workbox-sw.js')

// --------------------------------------------------
// Configure
// --------------------------------------------------

// Set workbox config
workbox.setConfig({
  "debug": false
})

// Start controlling any existing clients as soon as it activates
workbox.core.clientsClaim()

// Skip over the SW waiting lifecycle stage
workbox.core.skipWaiting()

workbox.precaching.cleanupOutdatedCaches()

// --------------------------------------------------
// Precaches
// --------------------------------------------------

// Precache assets

// -- Start of cachingExtensions --
workbox.routing.registerRoute(
  /.*\.(mp4|webm)/,
  workbox.strategies.cacheFirst({
    plugins: [
      new workbox.rangeRequests.Plugin(),
    ],
  }),
  'GET'
);
// -- End of cachingExtensions --

// --------------------------------------------------
// Runtime Caching
// --------------------------------------------------

// Register route handlers for runtimeCaching
workbox.routing.registerRoute(new RegExp('/_nuxt/(?!.*(__webpack_hmr|hot-update))'), new workbox.strategies.CacheFirst ({}), 'GET')
workbox.routing.registerRoute(new RegExp('/(?!.*(__webpack_hmr|hot-update))'), new workbox.strategies.NetworkFirst ({}), 'GET')
