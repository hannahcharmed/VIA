/* VIA — Service Worker */
const CACHE = 'via-v1';
const PRECACHE = [
  '/',
  '/index.html',
  '/explore.html',
  '/stay.html',
  '/creator.html',
  '/auth.html',
  '/onboard.html',
  '/apply.html',
  '/dashboard.html',
  '/owner.html',
  '/traveler.html',
  '/messages.html',
  '/booking.html',
  '/css/via.css',
  '/js/app.js',
  '/js/data.js',
  '/assets/via-logo.svg',
  'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Inter:wght@400;500;600;700&display=swap'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Network-first for API/dynamic; cache-first for assets
  const { request } = e;
  const url = new URL(request.url);

  // Skip non-GET and cross-origin requests we don't cache
  if (request.method !== 'GET') return;
  if (url.origin !== location.origin && !url.hostname.includes('fonts.g')) return;

  e.respondWith(
    caches.match(request).then(cached => {
      const network = fetch(request).then(res => {
        if (res.ok && res.type !== 'opaque') {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(request, clone));
        }
        return res;
      });
      return cached || network;
    })
  );
});
