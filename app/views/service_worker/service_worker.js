importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js')

const { CacheFirst, NetworkFirst } = workbox.strategies
const { registerRoute } = workbox.routing

function onInstall (event) {
  console.log('[Serviceworker]', 'Installing!', event)
}

function onActivate (event) {
  console.log('[Serviceworker]', 'Activating!', event)
}

function onFetch (event) {
  console.log('[Serviceworker]', 'Fetching!', event)
}

self.addEventListener('install', onInstall)
self.addEventListener('activate', onActivate)
self.addEventListener('fetch', onFetch)

registerRoute(({ url }) => url.pathname.startsWith('/'), new NetworkFirst({ cacheName: 'document' }))
registerRoute(({ url }) => url.pathname.startsWith('/charger'), new NetworkFirst({ cacheName: 'chargers' }))
registerRoute(({ request }) => request.destination === 'script' || request.destination === 'style', new CacheFirst({ cacheName: 'assets-styles-and-scripts' }))
registerRoute(({ request }) => request.destination === 'image', new CacheFirst({ cacheName: 'assets-images' }))
