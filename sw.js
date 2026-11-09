// Shell only: live financial observations are NEVER cached for offline display.
const CACHE='whaledesk-shell-v4';
const assets=['./','manifest.json','icon-192.png','icon-512.png','apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(assets)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==self.location.origin||!u.pathname.startsWith(new URL('./',self.location).pathname)||u.pathname.endsWith('dashboard_data.json'))return;
  e.respondWith(fetch(e.request).catch(()=>caches.match(e.request).then(r=>r||Response.error())));
});
