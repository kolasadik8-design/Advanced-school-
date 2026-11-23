// sw.js
const CACHE_NAME = 'school-v3';
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(['./manifest.json'])).then(() => self.skipWaiting())); });
self.addEventListener('fetch', (e) => { if (e.request.url.includes('firebase') || e.request.url.includes('gstatic')) { e.respondWith(fetch(e.request).catch(()=>caches.match('./index.html'))); return; } e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request)).catch(()=>caches.match('./index.html'))); });
