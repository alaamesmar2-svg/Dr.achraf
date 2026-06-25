const CACHE_NAME = 'clinic-cache-v1';
const ASSETS = [
  'index.html',
  'manifest.json',
  'icon-192.png'
];

// Install stage - pre-cache critical layout files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activation stage
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Intercept requests (Mandatory criteria for application installation)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
