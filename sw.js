const CACHE_NAME = "console-v1";

const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./css/style.css",
  "./js/app.js",
  "./js/data.js",
  "./js/food.js",
  "./food-deals.json",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png"
];

self.addEventListener("install", event => {

  event.waitUntil(

    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())

  );

});


self.addEventListener("activate", event => {

  event.waitUntil(

    caches.keys()
      .then(keys =>

        Promise.all(

          keys
            .filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))

        )

      )
      .then(() => self.clients.claim())

  );

});


self.addEventListener("fetch", event => {

  if (event.request.method !== "GET") {
    return;
  }

  /*
    Food data should always try the network first.
    This means the app can receive the latest daily deals.
  */

  if (
    new URL(event.request.url).pathname.endsWith(
      "/food-deals.json"
    )
  ) {

    event.respondWith(

      fetch(event.request)
        .then(response => {

          const copy = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, copy);
            });

          return response;

        })
        .catch(() =>
          caches.match(event.request)
        )

    );

    return;
  }


  /*
    Everything else uses normal network-first behaviour.
  */

  event.respondWith(

    fetch(event.request)
      .then(response => {

        if (
          new URL(event.request.url).origin ===
          self.location.origin
        ) {

          const copy = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, copy);
            });

        }

        return response;

      })
      .catch(() =>
        caches.match(event.request)
      )

  );

});
