/* ============================================================
   Service Worker — offline chalane ke liye
   (Website bina internet ke bhi khul jayegi)
   ============================================================ */

const CACHE = "kavita-ka-ghar-v1";

const FILES = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./assets/icon.svg",
  "./src/styles.css",
  "./vendor/react.min.js",
  "./vendor/react-dom.min.js",
  "./vendor/babel.min.js",
  "./src/data/poems-core.js",
  "./src/data/poems-a.js",
  "./src/data/poems-b.js",
  "./src/data/poems-c.js",
  "./src/data/poems-classics.js",
  "./src/lib/lang.js",
  "./src/lib/art.js",
  "./src/lib/hooks.js",
  "./src/components/Art.jsx",
  "./src/components/ClassPicker.jsx",
  "./src/components/Shell.jsx",
  "./src/components/Reader.jsx",
  "./src/App.jsx",
  "./src/main.js"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.all(
        FILES.map(f => c.add(f).catch(() => null))
      ))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;

  /* Pehle internet se naya file lao (hamesha fresh rahega),
     agar offline ho jaye to cache se chalega. */
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(e.request)
        .then(hit => hit || caches.match("./index.html")))
  );
});