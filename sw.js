const CACHE_NAME = 'school-v1';
const CORE_FILES = ['./manifest.json'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  if (e.request.url.includes('firebase') || e.request.url.includes('gstatic')) { e.respondWith(fetch(e.request).catch(()=>caches.match('./index.html'))); return; }
  e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request)).catch(()=>caches.match('./index.html')));
});
