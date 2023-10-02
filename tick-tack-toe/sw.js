const CACHE_NAME = 'tick-tack-toe-cache-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  'https://store-images.s-microsoft.com/image/apps.19816.13644806121635662.39dd8f53-413e-4f01-98c3-75d23f684dff.96bbf466-021f-405f-bc82-257a4bfae36b?mode=scale&q=90&h=300&w=300'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(FILES_TO_CACHE);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('push', (event) => {
  self.registration.pushManager.getSubscription().then((subscription) => {
    if (subscription === null) {
      const options = {
        body: 'Play Tic-Tac-Toe now!',
        icon: 'https://store-images.s-microsoft.com/image/apps.19816.13644806121635662.39dd8f53-413e-4f01-98c3-75d23f684dff.96bbf466-021f-405f-bc82-257a4bfae36b?mode=scale&q=90&h=300&w=300',
        
      };

      event.waitUntil(
        self.registration.showNotification('Tick-Tack-Toe', options)
      );
    }
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    self.registration.pushManager.getSubscription().then((subscription) => {
      if (subscription === null) {
        return self.registration.showInstallPrompt();
      } else {
        return clients.openWindow('/'); // Open the app if already installed
      }
    })
  );
});
