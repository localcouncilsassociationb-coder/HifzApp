const C='hifz-v18',A=['./','index.html','extra.js','manifest.webmanifest','data/mushaf.json','data/mutashabihat.json','data/meanings.json','data/ruku.json','data/rub.json','fonts/DigitalKhattIndoPak.otf','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(A)))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;
  e.respondWith(caches.open(C).then(async c=>{
    const r=await c.match(e.request,{ignoreSearch:true});
    const n=fetch(e.request).then(x=>{if(x.ok)c.put(e.request,x.clone());return x}).catch(()=>r);
    return r||n;
  }));
});
