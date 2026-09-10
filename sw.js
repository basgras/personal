// Pages and CSS: network-first, so returning visitors always get the latest
// version when online; the cache is only an offline fallback.
// Images: stale-while-revalidate, so they load instantly and refresh in the
// background. No need to bump CACHE_NAME when updating content.
var CACHE_NAME = 'basgrasmayer-v2';
var URLS_TO_CACHE = [
  '/',
  '/shared.css',
  '/fonoteka/',
  '/content/basgrasmayer.jpg',
  '/content/favicon.svg',
  '/fonoteka/content/fonoteka-hero.png',
  '/fonoteka/content/fonoteka1.png',
  '/fonoteka/content/fonoteka2.png',
  '/fonoteka/content/fonoteka3.png',
  '/fonoteka/content/fonoteka4.png'
];

self.addEventListener('install', function (e) {
  self.skipWaiting();
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
    }).then(function () { return self.clients.claim(); })
  );
});

function networkFirst(request) {
  return fetch(request).then(function (response) {
    if (response.ok) {
      var copy = response.clone();
      caches.open(CACHE_NAME).then(function (cache) { cache.put(request, copy); });
    }
    return response;
  }).catch(function () {
    return caches.match(request).then(function (cached) {
      return cached || caches.match('/');
    });
  });
}

function staleWhileRevalidate(request) {
  return caches.open(CACHE_NAME).then(function (cache) {
    return cache.match(request).then(function (cached) {
      var fresh = fetch(request).then(function (response) {
        if (response.ok) cache.put(request, response.clone());
        return response;
      });
      return cached || fresh;
    });
  });
}

self.addEventListener('fetch', function (e) {
  var request = e.request;
  var url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  if (request.mode === 'navigate' || request.destination === 'style') {
    e.respondWith(networkFirst(request));
  } else if (request.destination === 'image') {
    e.respondWith(staleWhileRevalidate(request));
  }
});
