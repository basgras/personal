var CACHE_NAME = 'basgrasmayer-v1';
var URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/shared.css',
  '/fonoteka/',
  '/fonoteka/index.html',
  '/content/basgrasmayer.jpg',
  '/content/favicon.svg',
  '/fonoteka/content/fonoteka-hero.png',
  '/fonoteka/content/fonoteka1.png',
  '/fonoteka/content/fonoteka2.png',
  '/fonoteka/content/fonoteka3.png',
  '/fonoteka/content/fonoteka4.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (names) {
      return Promise.all(
        names.filter(function (n) { return n !== CACHE_NAME; })
            .map(function (n) { return caches.delete(n); })
      );
    })
  );
});

self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (cached) {
      return cached || fetch(e.request);
    })
  );
});
