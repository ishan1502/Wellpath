// WellPath Service Worker for PWA & Desktop App
const CACHE_NAME = 'wellpath-v1';
const PRECACHE_ASSETS = [
  '/',
  '/manifest.webmanifest',
  '/heart-pulse.svg',
  '/favicon.svg',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/maskable-icon-512x512.png',
  '/icons/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Only handle GET requests and skip chrome-extension / non-http
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) {
    return;
  }

  // Network-first for navigation requests (HTML)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(async () => {
        const cached = await caches.match(event.request);
        if (cached) return cached;
        const root = await caches.match('/');
        if (root) return root;
        return new Response('Offline - please connect to the internet to load WellPath.', {
          headers: { 'Content-Type': 'text/plain' }
        });
      })
    );
    return;
  }

  // Cache-first for static icons and assets, network-first for others
  const isStaticAsset = event.request.url.includes('/icons/') || 
                        event.request.url.endsWith('.svg') || 
                        event.request.url.endsWith('.png') ||
                        event.request.url.endsWith('.jpg');

  if (isStaticAsset) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        }).catch(() => cachedResponse);
      })
    );
  }
});
