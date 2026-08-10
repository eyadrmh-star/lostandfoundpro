// Simple Service Worker for Lost & Found Pro PWA
const CACHE_NAME = 'lostfound-cache-v1';

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return new Response('أنت غير متصل بالإنترنت حالياً. يرجى المحاولة لاحقاً.', {
        status: 503,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      });
    })
  );
});
