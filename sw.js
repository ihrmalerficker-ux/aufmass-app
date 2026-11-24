const CACHE='aufmass-ficker-2026-11-24-freie-leistungen-v3';
const FILES=['./','./index.html','./manifest.webmanifest','./logo.jpg','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(async cache=>{await Promise.allSettled(FILES.map(url=>cache.add(url)));await self.skipWaiting()}))});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{for(const key of await caches.keys())if(key!==CACHE)await caches.delete(key);await self.clients.claim()})())});
self.addEventListener('fetch',event=>{if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;event.respondWith((async()=>{try{const response=await fetch(event.request);if(response.ok){const cache=await caches.open(CACHE);cache.put(event.request,response.clone())}return response}catch{const cached=await caches.match(event.request);return cached||Response.error()}})())});
